import NavigationActions from "@services/navigation"

const navMiddleware = state => next => action => {
  if (action.meta) {
    if (action.meta.routeName)
      NavigationActions.navigate(action.meta.routeName, action.meta.params)
    else if (action.meta.goBack) NavigationActions.goBack()
  }

  next(action)
}

export default navMiddleware
