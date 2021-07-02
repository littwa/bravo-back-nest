import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async addProduct(createProductDto) {
        const newProduct = await this.productModel.create({ ...createProductDto });
        if (!newProduct) throw new NotFoundException(`Can't create Product`);
        console.log("newGoods=", newProduct)
        return newProduct;
    };

    getProducts = async () => {

        const allProducts = await this.productModel.find();
        if (!allProducts) throw new NotFoundException(`Can't get Products`);
        return allProducts;

    };

    updateProduct = async (createProductDto, productId) => {

        const updatedProduct = await this.productModel.findByIdAndUpdate(
            productId,
            {
                $set: createProductDto,
            },
            {
                new: true,
                useFindAndModify: false,
            },
        );

        return !updatedProduct
            ? new NotFoundException(`Can't update Product id: ${productId}`)
            : updatedProduct;

    };

    deleteProduct = async (productId) => {
        const deletedProduct = await this.productModel.findByIdAndDelete(productId);
        if (!deletedProduct) throw new NotFoundException(`Can't del Product`);

        console.log("deletedProduct", deletedProduct, productId)
        return `Product ById: ${productId} has been deleted!`;
    };

}
