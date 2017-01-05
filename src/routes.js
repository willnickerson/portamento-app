routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
        name: 'home',
        url: '/',
        resolve: {
            userPatches: ['patchService', patchService => {
                return patchService.getAll();
                //TODO: once we resolve user data in the home state we need to chenage this get all to a get by ID
            }]
        }, 
        component: 'synth'
    });

    $stateProvider.state({
        name: 'patch',
        url: '/:id',
        resolve: {
            loadedPatch: ['patchService', '$transition$', (patchService, t) => {
                return patchService.get(t.params().id)
                    .then(patch => patch);
            }],
            userPatches: ['patchService', patchService => {
                return patchService.getAll();
                //TODO: once we resolve user data in the home state we need to chenage this get all to a get by ID
            }]
        },
        component: 'synth'
    });

    $stateProvider.state({
        name: 'about',
        url: '/about',
        component: 'about'
    });

    $stateProvider.state({
        name: 'user',
        url: '/user/:id',
        resolve: {
            user: ['authService', user => {
                console.log('hi from routes.js. user:', user);
                return user.currentUser;
            }],
            userData: ['userService', '$transition$', (userService, t) => {
                return userService.getUserById(t.params().id);
            }]
        },
        component: 'user'
    });

    $urlRouterProvider.otherwise('/');
}