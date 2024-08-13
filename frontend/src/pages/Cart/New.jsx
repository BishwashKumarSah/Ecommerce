import React from 'react'

const New = () => {
  return (
    <div>New</div>
  )
}

export default New


// <Route element={(status && status === STATUSES.IDLE) && < ProtectedRoutes />}>
// <Route path='/account' element={<Account />} />
// <Route path='/me/update' element={<Update />} />
// <Route path='/password/update' element={<UpdatePassword />} />
// <Route path='/checkout' element={<New />} />
// <Route path='/success' element={isAuthenticated === true ? <Success /> : <Navigate to="/login" />} />
// </Route>
// <ProtectedRoute exact path="/shipping" component={Shipping} />