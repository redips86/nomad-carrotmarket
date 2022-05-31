import useSWR from "swr";
import {ProductsWithCount} from "../pages";
import Item from "@components/item";

interface ProductListProps {
    kind: "favs" | "sales" | "purchases";
}

interface Record {
    id: number;
    product: ProductsWithCount;
}

interface ProductListResponse {
    [key: string]: Record[];
}

export default function ProductList({kind}: ProductListProps) {

    const {data} = useSWR<ProductListResponse>(`/api/users/me/${kind}`)
    return data ?
        <>
            {data?.[kind]?.map((record) => (
                <Item
                    id={record.id}
                    key={record.id}
                    title={record.product.name}
                    price={record.product.price}
                    hearts={record.product._count.favs}
                />
            ))}
        </> : null;
}