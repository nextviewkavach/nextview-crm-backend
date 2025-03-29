const TicketService = require("../services/ticket.service");
const { ActivityLogService } = require("../services/logging.service");
const ApiResponse = require("../utils/apiResponse.util");
const ApiError = require("../utils/apiError.util");
const asyncHandler = require("../utils/asyncHandler.util");

class TicketController {
  /**
   * Get all tickets with pagination and filtering
   * @route GET /api/tickets
   * @access Private
   */
  static getAllTickets = asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      category,
      search,
      assignedTo,
      startDate,
      endDate,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (assignedTo) query.assignedTo = assignedTo;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Parse sort parameter
    const sortOptions = {};
    const sortFields = sort.split(",");

    for (const field of sortFields) {
      if (field.startsWith("-")) {
        sortOptions[field.substring(1)] = -1;
      } else {
        sortOptions[field] = 1;
      }
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: sortOptions,
      populate: [
        { path: "createdBy", select: "name email" },
        { path: "assignedTo", select: "name email" },
        { path: "assignedBy", select: "name email" },
      ],
    };

    const tickets = await TicketService.getAllTickets(
      query,
      options,
      req.user.id,
      req.user.role
    );

    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "TICKETS_VIEWED",
      details: `Retrieved list of tickets`,
      ipAddress: req.ip,
    });

    return ApiResponse.withPagination(
      res,
      "Tickets retrieved successfully",
      tickets.results,
      tickets.pagination
    );
  });

  /**
   * Get ticket by ID
   * @route GET /api/tickets/:id
   * @access Private
   */
  static getTicketById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const ticket = await TicketService.getTicketById(
      id,
      req.user.id,
      req.user.role
    );

    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "TICKET_VIEWED",
      details: `Viewed ticket #${id} (${ticket.serialNumber})`,
      ipAddress: req.ip,
    });

    return ApiResponse.success(res, "Ticket retrieved successfully", ticket);
  });

  /**
   * Create a new ticket
   * @route POST /api/tickets
   * @access Private
   */
  static createTicket = asyncHandler(async (req, res) => {
    const ticketData = req.body;

    const ticket = await TicketService.createTicket(
      ticketData,
      req.user.id,
      req.user.role
    );

    // Log activity
    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "TICKET_CREATED",
      details: `Created new ticket: ${ticket.title}`,
      ipAddress: req.ip,
    });

    return ApiResponse.created(res, "Ticket created successfully", ticket);
  });

  /**
   * Update ticket
   * @route PUT /api/tickets/:id
   * @access Private
   */
  static updateTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const ticket = await TicketService.updateTicket(
      id,
      updateData,
      req.user.id,
      req.user.role
    );

    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "TICKET_UPDATED",
      details: `Updated ticket #${id}: ${ticket.title}`,
      ipAddress: req.ip,
    });

    return ApiResponse.success(res, "Ticket updated successfully", ticket);
  });

  /**
   * Assign ticket to a user with enhanced role tracking
   * @route POST /api/tickets/:id/assign
   * @access Private
   */
  static assignTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { assignToUserId, notes } = req.body;

    if (!assignToUserId) {
      throw ApiError.badRequest("User ID to assign the ticket to is required");
    }

    const ticket = await TicketService.assignTicket(
      id,
      assignToUserId,
      req.user.id,
      req.user.role,
      notes
    );

    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "TICKET_ASSIGNED",
      details: `Assigned ticket #${id} (${ticket.serialNumber}) to user ID: ${assignToUserId}`,
      ipAddress: req.ip,
    });

    return ApiResponse.success(res, "Ticket assigned successfully", ticket);
  });

  /**
   * Get ticket assignment history
   * @route GET /api/tickets/:id/assignment-history
   * @access Private
   */
  static getTicketAssignmentHistory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const history = await TicketService.getTicketAssignmentHistory(id);

    return ApiResponse.success(
      res,
      "Ticket assignment history retrieved successfully",
      history
    );
  });

  /**
   * Approve a resolved ticket
   * @route POST /api/tickets/:id/approve
   * @access Private
   */
  static approveTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const ticket = await TicketService.approveTicket(
      id,
      req.user.id,
      req.user.role
    );

    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "TICKET_APPROVED",
      details: `Approved resolution for ticket #${id}`,
      ipAddress: req.ip,
    });

    return ApiResponse.success(
      res,
      "Ticket resolution approved successfully",
      ticket
    );
  });

  /**
   * Add comment to ticket
   * @route POST /api/tickets/:id/comments
   * @access Private
   */
  static addComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comment, isInternal, attachments } = req.body;

    if (!comment) {
      throw ApiError.badRequest("Comment text is required");
    }

    const ticket = await TicketService.addComment(
      id,
      comment,
      isInternal,
      attachments,
      req.user.id
    );

    // Log activity
    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "COMMENT_ADDED",
      details: `Added ${isInternal ? "internal " : ""}comment to ticket #${id}`,
      ipAddress: req.ip,
    });

    return ApiResponse.success(res, "Comment added successfully", ticket);
  });

  /**
   * Upload attachments to a ticket
   * @route POST /api/tickets/:id/attachments
   * @access Private
   */
  static addAttachments = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { attachments } = req.body;

    if (
      !attachments ||
      !Array.isArray(attachments) ||
      attachments.length === 0
    ) {
      throw ApiError.badRequest("Attachments are required");
    }

    const ticket = await TicketService.addAttachments(
      id,
      attachments,
      req.user.id
    );

    await ActivityLogService.logActivity({
      userId: req.user.id,
      action: "ATTACHMENTS_ADDED",
      details: `Added ${attachments.length} attachment(s) to ticket #${id}`,
      ipAddress: req.ip,
    });

    return ApiResponse.success(res, "Attachments added successfully", ticket);
  });
}

module.exports = TicketController;
