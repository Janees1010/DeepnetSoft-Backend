const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');

// Fetch items for a specific menu
async function fetchMenuItems(req, res) {
    try {
        const menuId = req.params.menuId;
        console.log('Menu ID:', menuId);

        const currentMenu = await Menu.findById(menuId).populate('items');
        if (!currentMenu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        const menuItems = currentMenu.items;
        if (!menuItems || menuItems.length === 0) {
            return res.status(404).json({ message: 'No items found in this menu' });
        }

        return res.status(200).json({
            menuItems: menuItems,
            description: currentMenu.description,
        });
    } catch (error) {
        console.error('Error fetching menu items:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching menu items' });
    }
}

// Create a new menu
async function addNewMenu(req, res) {
    try {
        const menuBodyArray = req.body.data.menu;
        const selectedItems = req.body.data.selecteditems;

        const menuData = {
            name: menuBodyArray?.name,
            description: menuBodyArray?.description,
            items: [],
        };

        const newMenu = await Menu.create(menuData);
        if (!newMenu) {
            return res.status(400).json({ message: 'Menu creation failed' });
        }

        const menuItemPromises = selectedItems.map(async (item) => {
            item.menu = newMenu._id; // Associate menu ID
            const newMenuItem = await MenuItem.create(item);
            return newMenuItem._id;
        });

        const menuItemIds = await Promise.all(menuItemPromises);
        console.log('Created Menu Item IDs:', menuItemIds);

        newMenu.items.push(...menuItemIds);
        await newMenu.save();

        return res.status(201).json({
            message: 'Menu created successfully',
            menu: newMenu,
        });
    } catch (error) {
        console.error('Error creating menu:', error.message);
        return res.status(500).json({ error: 'An error occurred while creating the menu' });
    }
}

// Fetch all menus
async function fetchAllMenus(req, res) {
    try {
        const allMenus = await Menu.find();
        if (!allMenus || allMenus.length === 0) {
            return res.status(404).json({ message: 'No menus found' });
        }

        return res.status(200).json(allMenus);
    } catch (error) {
        console.error('Error fetching all menus:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching menus' });
    }
}

module.exports = {
    fetchMenuItems,
    addNewMenu,
    fetchAllMenus, 
};
      