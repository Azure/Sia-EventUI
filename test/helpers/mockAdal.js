const GetMockADAL = (ADALWatcher) => (dispatch) => ({
    login: () => ADALWatcher.loginCalled = true,
    logOut: () => ADALWatcher.logOutCalled = true
})

export default GetMockADAL
