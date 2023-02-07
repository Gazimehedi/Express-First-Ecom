import slugify from 'slugify';
import Category from '../model/category.js';
import Product from '../model/product.js';

export const create = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name.trim()){
            return res.json({error: 'Name is required'});
        }
        const categoryExists = await Category.findOne({name});
        if(categoryExists){
            return res.json({error: 'Category already exists'});
        }
        const category = await new Category({name,slug: slugify(name)}).save();
        res.json(category);
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(
            id,
            {
                name,
                slug: slugify(name)
            },
            {
                new: true
            }
        );
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}
export const remove = async (req,res) => {
    try {
        const {id} = req.params;
        const removed = await Category.findByIdAndDelete(id);
        res.json(removed);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}
export const list = async (req,res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}
export const read = async (req,res) => {
    try {
        const {slug} = req.params;
        const category = await Category.findOne({slug});
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}
export const ProductByCategory = async (req,res) => {
    try {
        const {slug} = req.params;
        const category = await Category.findOne({slug});
        const products = await Product.find({category}).populate('category');
        res.json({
            category,
            products
        });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}