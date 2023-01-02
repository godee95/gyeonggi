const BossReviewController = require('../../controllers/boss.review.controller');

let mockReviewService = {
  findAllReview: jest.fn(),
};

let mockRequest = {
  params: { userId: 2 },
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

let bossReviewController = new BossReviewController();
bossReviewController.BossReviewService = mockReviewService;

describe('Boss Review Controller Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('findAll', async () => {
    const reviewReturnValue = [
      {
        userId: 2,
        star: 3,
        content: 'content_1',
        createdAt: new Date('07 October 2011 15:50 UTC'),
      },
      {
        userId: 2,
        star: 1,
        content: 'content_2',
        createdAt: new Date('06 October 2011 15:50 UTC'),
      },
    ];

    mockReviewService.findAllReview = jest.fn(() => reviewReturnValue);

    await bossReviewController.getReviews(mockRequest, mockResponse);

    expect(mockReviewService.findAllReview).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: reviewReturnValue,
    });
  });
});
