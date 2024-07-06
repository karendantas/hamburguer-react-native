import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-stores";

export function add (products: ProductCartProps[], newProduct: ProductProps){
    //verificando se há um produto repetido
    const existingProduct = products.find(({id}) => id === newProduct.id)

    //se há produto repetido, retornamos a lista com a quantidade do produto atualizada
    if (existingProduct){
        return products.map((product) => product.id === existingProduct.id 
        ? {...product, quantity: product.quantity + 1}
        : product
        )
    }

    //se é um novo produto, retornamos uma nova lista com o novo produto
    return [...products, {...newProduct, quantity: 1}]
}