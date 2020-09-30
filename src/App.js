import React from 'react';
import { Routes } from './components/atoms/Routes'
import { Provider, connect } from 'react-redux';
import logger from "redux-logger";
import { rootReducer, initState as initialState } from './redux/reducers/index'
import { createStore, applyMiddleware } from "redux";
import { useFetch } from './hooks/useFetch';
import { loadCompany } from './redux/actions/company'


// GLOBAL CSS
import './App.css'
// import './index.css';
import './app-assets/css/core/colors/palette-noui.min.css'
import './app-assets/css/core/menu/menu-types/vertical-menu.min.css'
import './app-assets/css/core/menu/menu-types/vertical-overlay-menu.min.css'
import './app-assets/css/pages/app-invoice.min.css'
import './app-assets/css/pages/app-todo.min.css'
import './app-assets/css/plugins/animate/animate.min.css'
import './app-assets/css/plugins/calendars/app-calendar.min.css'
import './app-assets/css/plugins/extensions/context-menu.min.css'
import './app-assets/css/plugins/extensions/drag-and-drop.min.css'
import './app-assets/css/plugins/extensions/ext-component-treeview.min.css'
import './app-assets/css/plugins/extensions/noui-slider.min.css'
import './app-assets/css/plugins/extensions/swiper.min.css'
import './app-assets/css/plugins/extensions/toastr.min.css'
import './app-assets/css/plugins/file-uploaders/dropzone.min.css'
import './app-assets/css/plugins/forms/wizard.min.css'
import './app-assets/css/plugins/forms/validation/form-validation.min.css'
import './app-assets/css/plugins/tour/tour.min.css'
import './app-assets/css/bootstrap-extended.min.css'
import './app-assets/css/bootstrap.min.css'
import './app-assets/css/colors.min.css'
import './app-assets/css/components.min.css'
import './app-assets/fonts/boxicons/css/boxicons.min.css'

const middlewares = [logger];

const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));

const mapDispathToProps = dispatch => ({
  loadCompany: (company) => dispatch(loadCompany({ company }))
})

// const mapStateToProps = state => ({
//   ...state
// })

const AuthProviderRaw = ({ children, loadCompany, ...rest }) => {
  const { data, loading, error } = useFetch('/company')
  data && loadCompany(data?.results[0])
  return (
    <div>{children}</div>
  )
}

const AuthProvider = connect(null, mapDispathToProps)(AuthProviderRaw)


const App = () => {

  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
