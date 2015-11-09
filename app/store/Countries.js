Ext.define('IpadApp.store.Countries', {
    extend: 'Ext.data.Store',
     
    config: {
     model: 'IpadApp.model.Country',
     autoLoad: true,
      
     data: [
       {
            text: 'Fibber Magees Breakfast',
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
        },
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
             id: 4,
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
             id: 5,
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
             id: 6,
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
             id: 7,
             leaf: true
         }
        ]
    }
});
