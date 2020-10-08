import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route as RawRoute,
    Redirect
} from "react-router-dom";
// import { createBrowserHistory } from 'history'
import { Menu } from '../organisms/Menu'
import { Footer } from '../molecules/Footer'
import { AnimalsPage } from '../../pages/AnimalsPage'
import { InventoryPage } from '../../pages/InventoryPage'
import { SalesPage } from '../../pages/SalesPage';
import { InvoicePage } from '../../pages/InvoicePage';
import { AddorEditInvoicePage } from '../../pages/AddorEditInvoicePage'
import { TasksPage } from '../../pages/TasksPage';
import { ProfilePage } from '../../pages/ProfilePage'
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';
import { AnimalDetailPage } from '../../pages/AnimalDetailPage'
import T from 'prop-types'
import { AuthProvider } from './AuthProvider'
import { ErrorBoundary } from '../molecules/ErrorBoundary';
import { ErrorPage } from '../../pages/ErrorPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { ChangePasswordPage } from '../../pages/ChangePasswordPage'
import { ResendEmailPage } from '../../pages/ResendEmailPage'
import { LMA_AUTH_TOKEN } from '../../dictionary';

// const history = createBrowserHistory()

const Route = ({ authenticated, children, ...rest }) => {
    const token = localStorage.getItem(LMA_AUTH_TOKEN)

    if (!token && authenticated) {
        return <Redirect exact to='/login' />
    }

    return authenticated
        ? (
            <ErrorBoundary isPage>
                <AuthProvider>
                    <RawRoute {...rest}>
                        <Menu />
                        {children}
                        <Footer />
                    </RawRoute>
                </AuthProvider>
            </ErrorBoundary>
        )
        : (
            <ErrorBoundary isPage>
                <RawRoute  {...rest}>
                    {children}
                </RawRoute>
            </ErrorBoundary>
        )
}

Route.propTypes = {
    authenticated: T.bool
}

export const Routes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/animals" authenticated>
                        <AnimalsPage />
                    </Route>
                    <Route path="/animals/:animalId" authenticated>
                        <AnimalDetailPage />
                    </Route>
                    <Route path="/inventory" authenticated>
                        <InventoryPage />
                    </Route>
                    <Route path="/tasks" authenticated>
                        <TasksPage />
                    </Route>
                    <Route path="/sales" exact authenticated>
                        <SalesPage />
                    </Route>
                    <Route path="/sales/manage-invoice" authenticated>
                        <AddorEditInvoicePage />
                    </Route>
                    <Route path="/sales/invoice/:invoiceId" authenticated>
                        <InvoicePage />
                    </Route>
                    <Route path="/profile" authenticated>
                        <ProfilePage />
                    </Route>
                    <Route path="/dashboard" authenticated>
                        <div>Dashboard</div>
                    </Route>
                    <Route path="/faq" authenticated>
                        <div>FAQs</div>
                    </Route>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/resend-email">
                        <ResendEmailPage />
                    </Route>
                    <Route path="/signup">
                        <SignupPage />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordPage />
                    </Route>
                    <Route path="/change-password">
                        <ChangePasswordPage />
                    </Route>
                    <Route path="*">
                        <ErrorPage />
                    </Route>
                    <Redirect exact from='/' to='/animals' />
                </Switch>
            </Router>
        </>
    );
}
