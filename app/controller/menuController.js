/* 
 * Main Controller
 */
Ext.define("IpadApp.controller.menuController", {
    extend: "Ext.app.Controller",
    
    config: {
        refs: {
            loginView: "loginview",
            homeView: "homeView",
            categoriesView: "categoriesView",
            categoryListViewBeverages: "categoryListViewBeverages",
            categoryListViewStarters: "categoryListViewStarters",
            categoryListViewSpirits: "categoryListViewSpirits",
            cartView: "cartView",
            changeListDataOnBtn: "changeListDataOnBtn",
            searchView: "searchView",
            menu: "menu"
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            },
            homeView: {
                onMenuButtonTap: "onMenuButtonTap",
                onQuestButtonTap: "onQuestButtonTap"
            },
            categoriesView: {
                onBackBtnTap: "onBackBtnTap",
                onCategoryTap: "onCategoryTap",
                onCartBtnTap: "onCartBtnTap"
            },
            categoryListViewBeverages: {
                onBackBtnTapCategoryList: "onBackBtnTapCategoryList",
                onCartBtnTap: "onCartBtnTap",
                onFilterBtnTap: "onFilterBtnTap",
                onDataUpdateBtnTap: "onDataUpdateBtnTap",
                onRightSlideMenuTap: "onRightSlideMenuTap",
                onSearchButtonTap: "onSearchButtonTap"
            },
            categoryListViewStarters: {
                onBackBtnTapCategoryList: "onBackBtnTapCategoryList",
                onCartBtnTap: "onCartBtnTap"
            },
            categoryListViewSpirits: {
                onBackBtnTapCategoryList: "onBackBtnTapCategoryList",
                onCartBtnTap: "onCartBtnTap"
            },
            cartView: {
                onCloseBtnTap: "onCloseBtnTap"
            },
            searchView: {
            },
            menu: {
            }
            
        }
    },
    sessionToken: null,
    
    onSignInCommand: function (view, username, password) {
        
        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,
            loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        Ext.Ajax.request({
            url: 'http://hoppitality.hopperlink.com/web/api/',
            method: 'post',
            params: {
                action: "login", password: "123456", id: "1", email: "waiter1@hopperlink.com",
                //user: username,
                //pwd: password
                //action: "login", password: password, id: "1", email: username,
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success === "true") {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    me.signInSuccess();     //Just simulating success.
                } else {
                    me.signInFailure(loginResponse.message);
                }
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Login failed. Please try again later.');
            }
        });
    },
    signInSuccess: function () {
        console.log('Signed in.');
        var loginView = this.getLoginView();
        mainMenuView = this.getMainMenuView();
        loginView.setMasked(false);
        
        this.activateHomeView();
    },
    signInFailure: function (message) {
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },
    loadMarkers: function() {
        //set up refs to the two stores
        var markerStore = Ext.getStore('markerStore');
        var markerStoreLocalStorage= Ext.getStore('markerStoreLocalStorage');
 
        //load the localStorage store
        markerStoreLocalStorage.load();
 
        // check if localStorage contains data
        if ((markerStoreLocalStorage.getCount()) == 0) {
            // nothing found so  we need to load the data from external source
            console.log('localStorage data not found');
            //hand off to onMarkerStoreLoad function (below)
            markerStore.on({
                load: 'onMarkerStoreLoad',
                scope: this
            });
            //call load to trigger above
            markerStore.load();
        } else {
            // we are ok, just print some debug
            console.log('localStorage data found');
            console.log('localStorage count:' + markerStoreLocalStorage.getCount());
        }
        //finally set the list's store to localStorage
        this.getListMarkersCard().setStore(markerStoreLocalStorage);
 
    },
    onMarkerStoreLoad: function() {
        //set up refs
        var markerStoreLocalStorage= Ext.getStore('markerStoreLocalStorage');
        var markerStore = Ext.getStore('markerStore');
        //loop through each data item and add to localStorage
        markerStore.each(function(item){
            markerStoreLocalStorage.add(item);
        });
        markerStoreLocalStorage.sync();
     },
    onFilterBtnTap: function(){
        
        /*
         * Select sencha element by id
         */
        
        var mylistitems = Ext.ComponentQuery.query("#nested-list-uii");
        var newData = Ext.getStore('menuStore');
        mylistitems.store.load();
    },
    onCartBtnTap: function() {
        window.globActPage = arguments[1];
        this.activateCartViewSlideTop();
    },
    onCloseBtnTap: function() {
        if(window.globActPage && window.globActPage === 1)
            this.activateCategoriesViewSlideRight();
        else
            this.activateCategoryListViewSlideCart();
    },
    onBackBtnTapCategoryList: function() {
        this.activateCategoriesViewSlideRight();
    },
    onBackBtnTap: function () {
        this.activateHomeView();
    },
    onMenuButtonTap: function () {
        simpleCart.load();
        this.activateCategoriesViewSlideLeft();
    },
    onRightSlideMenuTap: function(){
        this.activateLeftSlidingMenu();
    },
    onSearchButtonTap: function (){
        this.activateSearchView();
    },
    onCategoryTap: function(){
        var view = arguments[1];
        var viewName = 'BreakfastMenu';
        switch(view)
            {
            case 0:
                this.onDataUpdateBtnTap('BreakfastMenu');
                this.activateCategoryListViewBeverages();
                viewName = 'BreakfastMenu';
              break;
            case 1:
              this.activateCategoryListViewStarters();
              break;
            case 2:
                this.onDataUpdateBtnTap('ChefsFavourites');
                this.activateCategoryListViewBeverages();
                viewName = 'ChefsFavourites';
              break;
            case 3:
                this.onDataUpdateBtnTap('MainMenu');
                this.activateCategoryListViewBeverages();
                viewName = 'MainMenu';
              break;
            case 4:
                this.onDataUpdateBtnTap('Desserts');
                this.activateCategoryListViewBeverages();
                viewName = 'Desserts';
              break;
            default:
                this.onDataUpdateBtnTap('BreakfastMenu');
                this.activateCategoryListViewBeverages();
            }
            this.changeActiveItem(viewName);
    },
    onDataUpdateBtnTap: function(data){
        var categorylistview = this.getCategoryListViewBeverages();
        //var subStore = Ext.getStore('subStore');
        
        switch(data)
            {
            case 'BreakfastMenu':
                var newData = {
                    items: [
                    {
                        text: 'Fibber Magee\'s Breakfast',
                        content: 'Pork sausage, pork bacon, hash brown, mushrooms,Tomato, black pudding, egg (cooked to your liking),Baked beans, with toast or fried bread.',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/FibberMageesBreakfast.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/FibberMageesBreakfast.jpg',
                        price: '48',
                        subcat: 'BreakfastMenu',
                        cls: 'top-item-root',
                        tags: 'breakfast',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'Bacon or Sausage Bap',
                        content: 'Two rashers of pork bacon or two pork sausages in a soft white bap.',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/bacon and sausage bap.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/bacon and sausage bap.jpg',
                        price: '18',
                        subcat: 'BreakfastMenu',
                        cls: 'top-item-root',
                        tags: 'breakfast',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    },
                    {
                        text: 'Big Breakfast Bap',
                        content: 'Pork bacon, pork sausage, black pudding, egg & tomato in a floury white bap.',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/breakfastBap.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/breakfastBap.jpg',
                        price: '26',
                        subcat: 'BreakfastMenu',
                        cls: 'top-item-root',
                        tags: 'breakfast',
                        likeValue: 0,
                        id: 2,
                        leaf: true
                    },
                    {
                        text: 'Eggs',
                        content: '3 eggs cooked how you like, (scrambled, poached, omelete or fried) served with white or brown bread toast.',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/eggs.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/BreakfastMenu/eggs.jpg',
                        price: '30',
                        subcat: 'BreakfastMenu',
                        cls: 'top-item-root',
                        tags: 'breakfast',
                        likeValue: 0,
                        id: 3,
                        leaf: true
                    }
                    
                ]
                };
              break;
              case 'ChefsFavourites':
                var newData = {
                    items: [
                    {
                        text: 'Sirloin Steak in Brandy Sauce',
                        content: 'Served to your liking atop mashed potato with Brandy sauce, sprinkled with crispy garlic & mushrooms',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/sirloinsteakjpg.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/sirloinsteakjpg.jpg',
                        price: '88',
                        subcat: 'chefs-favourites',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'Slow Roasted Lamb Shank',
                        content: 'Tender lamb shank on a bed of sundried tomato mash, steamed vegetables with a wine & mint gravy',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/LambShank.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/LambShank.jpg',
                        price: '66',
                        subcat: 'chefs-favourites',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    },
                    {
                        text: 'Baby Pork Ribs',
                        content: 'Slow roasted and marinated with Chinese 5 spices served with savory rice & wedges of orange',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/baby pork ribs.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/baby pork ribs.jpg',
                        price: '72',
                        subcat: 'chefs-favourites',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 2,
                        leaf: true
                    },
                    {
                        text: 'Lamb Chops',
                        content: 'Served with grilled millefuielle of vegetables & stuffed skinned potatoes choose from mint gravy or Cajun spiced gravy',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/lamb-chops.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/ChefsFavourites/lamb-chops.jpg',
                        price: '74',
                        subcat: 'chefs-favourites',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 3,
                        leaf: true
                    }
                ]
                };
              break;
              case 'Desserts':
                var newData = {
                    items: [
                    {
                        text: 'Homemade cheesecake selection',
                        content: '3 small different flavoured cheesecakes',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/cheesecake.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/cheesecake.jpg',
                        price: '20',
                        subcat: 'Desserts',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'Trio of Ice Cream',
                        content: 'Please ask your server for flavors',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/icecream.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/icecream.jpg',
                        price: '17',
                        subcat: 'Desserts',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    },
                    {
                        text: 'Individual Homemade Apple Crumble',
                        content: 'With custard',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/apple_crumble.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/apple_crumble.jpg',
                        price: '22',
                        subcat: 'Desserts',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 2,
                        leaf: true
                    },
                    {
                        text: 'Banoffee Pie',
                        content: 'Individual homemade portion ',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/banoffee pie.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/desserts/banoffee pie.jpg',
                        price: '22',
                        subcat: 'Desserts',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 3,
                        leaf: true
                    }
                ]
                };
              break;
              case 'MainMenu':
                var newData = {
                    items: [
                    {
                        text: 'Cottage Pie',
                        content: 'Savory mince beef with carrots and onions in gravy, topped with mash and served with the chefs vegetables of the day, or chips and baked beans',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/cottage-pie.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/cottage-pie.jpg',
                        price: '52',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'Butter Chicken Masala',
                        content: 'Chicken cooked in a mild spiced garam masala sauce served with chips or rice and a popadum',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/ButterChickenMasala_sm.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/ButterChickenMasala_sm.jpg',
                        price: '52',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    },
                    {
                        text: 'Traditional Irish Stew',
                        content: 'A country casserole of lamb, vegetables & potatoes served with braised red cabbage and a chunk of warm bread',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/Irishstew.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/Irishstew.jpg',
                        price: '50',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 2,
                        leaf: true
                    },
                    {
                        text: 'Rib Eye Steak',
                        content: 'Our now famous steak cooked to your liking and served with chips, saut?ed cherry tomatoes, button mushrooms & onion rings.Choose from mushroom, pepper or Dijon sauce',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/ribeyesteak.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/ribeyesteak.jpg',
                        price: '82',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 3,
                        leaf: true
                    },
                    {
                        text: 'All Day Breakfast',
                        content: 'Pork sausage, pork bacon, black pudding, egg, tomato, baked beans, hash brown, mushroom & toast or fried bread',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/alldaybreakfast.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/alldaybreakfast.jpg',
                        price: '48',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 4,
                        leaf: true
                    },
                    {
                        text: 'Battered Sausages',
                        content: 'Three pork sausages served with chips and beans',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/battered sausage.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/battered sausage.jpg',
                        price: '48',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 5,
                        leaf: true
                    },
                    {
                        text: 'Steak & Mushroom Pie',
                        content: 'Braised beef in ale with mushrooms topped with puff pastry served with mush pees and chips or mash',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/steakand mushroom pie.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/steakand mushroom pie.jpg',
                        price: '57',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 6,
                        leaf: true
                    },
                    {
                        text: 'Honey Roasted Gammon',
                        content: 'With chips, baked beans and egg or pineapple',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/HoneyRoasted Gammon.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/HoneyRoasted Gammon.jpg',
                        price: '57',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 7,
                        leaf: true
                    },
                    {
                        text: 'Stuffed Chicken Breast',
                        content: 'Stuffed with spring onion and garlic served with red wine and mushroom sauce accompanied with carrots, fresh asparagus and gratin potato',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/stuffedchicken breast.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/stuffedchicken breast.jpg',
                        price: '58',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 8,
                        leaf: true
                    },
                    {
                        text: 'Atlantic Cod Fillet',
                        content: 'With a lemon parsley white sauce, steamed vegetables & new potatoes',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/atlantic cod fillet.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/atlantic cod fillet.jpg',
                        price: '75',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 9,
                        leaf: true
                    },
                    {
                        text: 'The Mighty Cheese Burger',
                        content: '200gm beef burger with melted cheese, tomato, onion, lettuce & gherkins, served with chips',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/mightycheese burger.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/mightycheese burger.jpg',
                        price: '46',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 10,
                        leaf: true
                    },
                    {
                        text: 'Fish and Chips',
                        content: 'A very popular Fibbers dish! Now available with Hammour or Cod fillet, either battered or bread-crumbed, with chips, mushy peas and tartar sauce.',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/fish-and-chips.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/fish-and-chips.jpg',
                        price: '58',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 11,
                        leaf: true
                    },
                    {
                        text: 'Vegetable Carbonara',
                        content: 'Tagliatelle pasta with pan fried seasonal vegetables in a succulent white cream served with crunchy garlic bread.',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/VegetableCarbonara.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/VegetableCarbonara.jpg',
                        price: '42',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 12,
                        leaf: true
                    },
                    {
                        text: 'Chili Con Carne',
                        content: 'Spicy marinated beef & red kidney beans served with rice, tortillas and grated cheddar cheese',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/chili-con-carne-2.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/chili-con-carne-2.jpg',
                        price: '54',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 12,
                        leaf: true
                    },
                    {
                        text: 'Award winning Prawn Tagliatelle',
                        content: 'Lightly spiced prawns with tagliatelle laced with garlic, pesto, olive oil and presented with crunch garlic bread',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/prawntaigatelli.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/prawntaigatelli.jpg',
                        price: '61',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 13,
                        leaf: true
                    },
                    {
                        text: 'Beef & Potatoes',
                        content: 'Braised in Guinness and served with spinach and buttery cabbage',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/beefand potatoes.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/beefand potatoes.jpg',
                        price: '62',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 14,
                        leaf: true
                    },
                    {
                        text: 'Salmon fillet',
                        content: 'Either lightly poached or pan fried on a spinach sauce with cheesy mash and fresh vegetables',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/salmonfillet.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/salmonfillet.jpg',
                        price: '68',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 15,
                        leaf: true
                    },
                    {
                        text: 'Liver & Onions',
                        content: 'Served with mashed potatoes, julienne of bacon & onion gravy',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/liverand onions.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/liverand onions.jpg',
                        price: '49',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 16,
                        leaf: true
                    },
                    {
                        text: 'Bangers and Mash',
                        content: 'Four pork sausages nestled in mashed potatoes, smothered with Guinness and onion gravy',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/Bangers-and-Mash.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/Bangers-and-Mash.jpg',
                        price: '54',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 17,
                        leaf: true
                    },
                    {
                        text: 'Bacon and Egg burger',
                        content: 'Prime beef burger with pork bacon & fried egg served with chips and homemade sweet corn relish',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/Eggandbaconburger.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/Eggandbaconburger.jpg',
                        price: '40',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 18,
                        leaf: true
                    },
                    {
                        text: 'Thai Curry',
                        content: 'With beef or chicken and a choice of sauces, red, green or yellow curry. Choose chips or rice!',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/thai-curry.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/thai-curry.jpg',
                        price: '58',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 19,
                        leaf: true
                    },
                     {
                        text: 'Blue Cheese & Garlic Mushrooms',
                        content: 'Pan fried mushrooms in a blue cheese and garlic cream sauce nestling in a wonton shell',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/bluecheeseandgarlicmushrooms.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/MainMenu/bluecheeseandgarlicmushrooms.jpg',
                        price: '39',
                        subcat: 'MainMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 20,
                        leaf: true
                    }
                ]
                };
              break;
              case 'Salads':
                var newData = {
                    items: [
                    {
                        text: 'Fibber Caesar Salad',
                        content: 'An old favorite and very tasty, served with a choice of Plain',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/caesar-salad.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/caesar-salad.jpg',
                        price: '40',
                        subcat: 'Salads',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'Breaded Brie Salad',
                        content: 'Deep fried wedges of Brie with an orange salad, laced with cranberry dressing',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/breadedBrieSalad.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/breadedBrieSalad.jpg',
                        price: '40',
                        subcat: 'Salads',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    },
                    {
                        text: 'Ploughman?s Lunch',
                        content: 'A selection of Cheddar, Brie and Stilton cheeses, sliced ham, pickles, salad leaves with a baguette',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/ploughmans.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/ploughmans.jpg',
                        price: '48',
                        subcat: 'Salads',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 2,
                        leaf: true
                    },
                    {
                        text: 'Greek Salad',
                        content: 'Feta cheese, olives, tomatoes and cucumber tossed in an Oregano & Olive dressing',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/Greek-Salad.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Salads/Greek-Salad.jpg',
                        price: '40',
                        subcat: 'Salads',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 3,
                        leaf: true
                    }
                ]
                };
              break;
              case 'Sandwiches':
                var newData = {
                    items: [
                    {
                        text: 'Tuna, sweet corn and cheese melt',
                        content: 'Creamy tuna with melted cheese on toasted sliced bread, served with succulent coleslaw and chips.',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Sandwiches/TunaSweetcornCheese.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Sandwiches/TunaSweetcornCheese.jpg',
                        price: '38',
                        subcat: 'Sandwiches',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'The Steak Sandwich',
                        content: 'Saut?ed beef, onions, peppers & melted cheese in toasted ciabatta, served with spicy wedges and coleslaw',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Sandwiches/steak_sandwich.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Sandwiches/steak_sandwich.jpg',
                        price: '38',
                        subcat: 'Sandwiches',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    },
                    {
                        text: 'Hot Breaded Chicken Breast',
                        content: 'Deep fried bread-crumbed chicken breast, iceburg lettuce & tomato, served in a bap with coleslaw and chips',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Sandwiches/sbreadedchickenbreast.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Sandwiches/breadedchickenbreast.jpg',
                        price: '38',
                        subcat: 'Sandwiches',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 2,
                        leaf: true
                    }
                ]
                };
              break;
              case 'SnackMenu':
                var newData = {
                    items: [
                    {
                        text: 'Tandoori Chicken Bites',
                        content: 'With mango chutney',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/Tandoori Chicken Bites.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/Tandoori Chicken Bites.jpg',
                        price: '25',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'Jalapeno Poppers',
                        content: 'With a salsa dip',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/jalapeno_poppers_1.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/jalapeno_poppers_1.jpg',
                        price: '24',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    },
                    {
                        text: 'Chicken or Beef Satay',
                        content: 'With a peanut dip',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/chickenorbeefsatay.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/chickenorbeefsatay.jpg',
                        price: '24',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 2,
                        leaf: true
                    },
                    {
                        text: 'Deep Fried Mozzarella Sticks (V)',
                        content: 'With a salsa dip',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu.jpg',
                        price: '24',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 3,
                        leaf: true
                    },
                    {
                        text: 'Spicy Chicken Wings',
                        content: 'Finger licking good with a blue cheese',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu.jpg',
                        price: '28',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 4,
                        leaf: true
                    },
                    {
                        text: 'Spicy Wedges',
                        content: 'With Mexican dip & sour cream',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu.jpg',
                        price: '20',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 5,
                        leaf: true
                    },
                    {
                        text: 'Onion Rings',
                        content: 'With garlic mayonnaise',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snack-menu.jpg',
                        price: '20',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 6,
                        leaf: true
                    },
                    {
                        text: 'Cheesy Chips with Bacon (P)',
                        content: 'Chips topped with melted cheese and bacon bits ',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/cheesychips withbacon.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/cheesychips withbacon.jpg',
                        price: '29',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 7,
                        leaf: true
                    },
                    {
                        text: 'Sesame Battered king Prawns',
                        content: 'With lemon mayonnaise',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/sesamebatterdkingprawns.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/sesamebatterdkingprawns.jpg',
                        price: '32',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 8,
                        leaf: true
                    },
                    {
                        text: 'Meat Balls',
                        content: 'Beef, chicken or prawn with a sweet chili dip',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '26',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 9,
                        leaf: true
                    },
                    {
                        text: 'Fibbers Cheese on Toast (P)',
                        content: 'with onion, bacon bits & a hint of chili',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '22',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 10,
                        leaf: true
                    },
                    {
                        text: 'Mexican Nachos',
                        content: 'with sour cream, guacamole and jalapenos',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '23',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 11,
                        leaf: true
                    },
                    {
                        text: 'Vegetable Spring Rolls (V)',
                        content: 'with a sweet chili dip',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '24',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 12,
                        leaf: true
                    },
                    {
                        text: 'Snack Platter (Good for two)',
                        content: 'Chicken Satay, mozzarella sticks, spring rolls samosa, jalapeno poppers, spicy wedges (Also available as vegetarian)',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snackPlatter.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/SnackMenu/snackPlatter.jpg',
                        price: '48',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 13,
                        leaf: true
                    },
                    {
                        text: 'Fisherman?s Platter',
                        content: 'Panko prawns, fish goujons, calamari rings skinny chips, salad and dips',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '38',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 14,
                        leaf: true
                    },
                    {
                        text: 'Deep Fried Wantons',
                        content: 'Minced beef, chicken or prawn',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '26',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 15,
                        leaf: true
                    },
                    {
                        text: 'Goujons of Chicken',
                        content: 'with a sweet chili sauce',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '24',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 16,
                        leaf: true
                    },
                    {
                        text: 'Deep Fried Calamari',
                        content: 'with lemon & garlic mayonnaise',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu-image.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/snack-menu.jpg',
                        price: '24',
                        subcat: 'SnackMenu',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 17,
                        leaf: true
                    }
                ]
                };
              break;
              case 'Specials':
                var newData = {
                    items: [
                    {
                        text: 'Beef Lasagna',
                        content: 'Home-made by our chef, served with salad and garlic bread',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Specials/beeflasagne.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Specials/beeflasagne.jpg',
                        price: '45',
                        subcat: 'Pasta',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 0,
                        leaf: true
                    },
                    {
                        text: 'Jacket Potato',
                        content: 'With a choice of fillings....If we got it, you can have it!',
                        images: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Specials/jacketpotato.jpg',
                        tumb: 'http://hopperlink.ae/demo/ipad-menu-srv/public/uploads/images/Specials/jacketpotato.jpg',
                        price: '35',
                        subcat: 'Pasta',
                        cls: 'top-item-root',
                        tags: 'beef,alcohol',
                        likeValue: 0,
                        id: 1,
                        leaf: true
                    }
                ]
                };
              break;
            }
        
        Ext.getCmp('nested-list-uii').onBackTap();
        categorylistview.setNewNestedListData(newData);
    },
            
    changeActiveItem: function(itemName){
        $('.active-cat-menu').removeClass('active-cat-menu');
        $('.data-update-'+itemName+'-btn').addClass('active-cat-menu');
    },
            
    activateCartViewSlideTop: function(){
        var categorylistview = this.getCartView();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideLeftTransition);
    },      
    activateCategoryListViewSlideCart: function(){
        var categorylistview = this.getCategoryListViewBeverages();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideRightTransition);
    },    
    activateCategoryListViewBeverages: function(){
        var categorylistviewbeverages = this.getCategoryListViewBeverages();
        Ext.Viewport.animateActiveItem(categorylistviewbeverages, this.slideLeftTransition);
    },
    activateCategoryListViewStarters: function(){
        var categorylistview = this.getCategoryListViewStarters();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideLeftTransition);
    },
    activateCategoryListViewSpirits: function(){
        var categorylistview = this.getCategoryListViewSpirits();
        Ext.Viewport.animateActiveItem(categorylistview, this.slideLeftTransition);
    },
    activateCategoriesViewSlideLeft: function () {
        var categoriesview = this.getCategoriesView();
        Ext.Viewport.animateActiveItem(categoriesview, this.slideLeftTransition);
    },
    activateCategoriesViewSlideRight: function () {
        var categoriesview = this.getCategoriesView();
        Ext.Viewport.animateActiveItem(categoriesview, this.slideRightTransition);
    },
    activateHomeView: function () {
        var homeview = this.getHomeView();
        Ext.Viewport.animateActiveItem(homeview, this.slideRightTransition);
    },
    activateLeftSlidingMenu: function(){
        var menuview = this.getMenu();
        var categoryList = Ext.get('ext-element-2');
        categoryList.addCls('viewport-inner');
        menuview.toggle();
    },
    activateSearchView: function() {
        var searchView = this.getSearchView();
        var categoryList = Ext.get('ext-element-2');
        categoryList.addCls('viewport-inner');
        searchView.toggle();
    },
            
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    slideTopTransition: { type: 'slide', direction: 'top' }
    
});

