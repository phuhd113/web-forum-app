import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../../components/admin/dashboard/budget';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../components/admin/theme';
import { CssBaseline } from '@mui/material';
//import { LatestOrders } from '../components/dashboard/latest-orders';
//import { LatestProducts } from '../components/dashboard/latest-products';
//import { Sales } from '../components/dashboard/sales';
//import { TasksProgress } from '../components/dashboard/tasks-progress';
//import { TotalCustomers } from '../components/dashboard/total-customers';
//import { TotalProfit } from '../components/dashboard/total-profit';
//import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../../components/admin/dashboard-layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { userService } from '../../services/user.service';


const Dashboard = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);
        console.log('router.asPath' + router.asPath);
        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        console.log('userService.userValue' + JSON.stringify(userService.userValue));
        const publicPaths = ['/admin/login', '/admin/register'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/admin/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {authorized && <DashboardLayout>
                <Head>
                    <title>
                        Dashboard | Material Kit
                    </title>
                </Head>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <Container maxWidth={false}>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <Budget />
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                {/*<TotalCustomers />*/}
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                {/* <TasksProgress /> */}
                            </Grid>
                            <Grid
                                item
                                xl={3}
                                lg={3}
                                sm={6}
                                xs={12}
                            >
                                {/* <TotalProfit sx={{ height: '100%' }} /> */}
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                md={12}
                                xl={9}
                                xs={12}
                            >
                                {/* <Sales /> */}
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xl={3}
                                xs={12}
                            >
                                {/* <TrafficByDevice sx={{ height: '100%' }} /> */}
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xl={3}
                                xs={12}
                            >
                                {/* <LatestProducts sx={{ height: '100%' }} /> */}
                            </Grid>
                            <Grid
                                item
                                lg={8}
                                md={12}
                                xl={9}
                                xs={12}
                            >
                                {/* <LatestOrders /> */}
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </DashboardLayout>}



        </ThemeProvider>
    )
}



export default Dashboard;