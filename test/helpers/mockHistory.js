export const GetMockHistory = (mockHistoryRecorder) => ({
  push: (input) => mockHistoryRecorder.push(input)
})

export const GetHistoryRecorder = () => []
