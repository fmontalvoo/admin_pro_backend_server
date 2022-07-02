const getMenuBuilder = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            items: [
                {
                    title: 'Main',
                    url: '/dashboard',
                },
                {
                    title: 'Graph One',
                    url: 'graph-one',
                },
                {
                    title: 'Progress Bar',
                    url: 'progress',
                },
                {
                    title: 'Promises',
                    url: 'promises',
                },
                {
                    title: 'Rxjs',
                    url: 'rxjs',
                },
            ]
        },
        {
            title: 'Mantenimeintos',
            icon: 'mdi mdi-folder-lock-open',
            items: [
                {
                    title: 'Doctores',
                    url: 'doctors',
                },
                {
                    title: 'Hospitales',
                    url: 'hospitals',
                },
            ]
        }
    ];

    if (role === 'ADMIN_ROLE')
        menu[1].items.unshift({
            title: 'Usuarios',
            url: 'users',
        });

    return menu;

}

module.exports = { getMenuBuilder }