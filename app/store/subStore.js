/* 
 * All testing data going here
 */

var data = {
            items: [
            {
                text: 'Spaghetti Bolognese',
                content: 'Tomato sauce, Italian mozzarella, beef ham or turkey ham, mushrooms, black olives and artichoke',
                images: 'pizza-detail-image.jpg',
                tumb: 'tumb1_70.jpg',
                price: '20',
                leaf: true
            },
            {
                text: 'Spaghetti Napoli',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '35',
                leaf: true
            },
            {
                text: 'Spaghetti Salsiccia',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '21',
                leaf: true
            },
            {
                text: 'Fettuccine Carbonara',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '45',
                leaf: true
            },
            {
                text: 'Fusilli Saltati',
                content: '',
                images: '',
                tumb: 'tumb1_70.jpg',
                price: '40',
                leaf: true
            }
        ]
        };
Ext.define("IpadApp.store.subStore", {
    extend: "Ext.data.Store",
    
    config: {
        model: 'IpadApp.model.subModel',
        defaultRootProperty: 'items',
        root: data
    }
});

