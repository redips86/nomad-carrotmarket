import type {NextPage} from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import {useRouter} from "next/router";
import useSWR, {useSWRConfig} from "swr";
import Link from "next/link";
import {Product, User} from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import {cls} from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Image from "next/image";

interface ProductWithUser extends Product {
    user: User;
}

interface ItemDetailResponse {
    ok: boolean;
    product: ProductWithUser;
    relatedProduct: ProductWithUser[];
    isLiked: boolean;
}

const ItemDetail: NextPage = () => {
    const {user, isLoading} = useUser();
    const router = useRouter();
    const {mutate} = useSWRConfig();
    const {
        data,
        mutate: boundMutate
    } = useSWR<ItemDetailResponse>(router.query.id && `/api/products/${router.query.id}`);

    const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
    const onFavClick = () => {
        if (!data) return;
        boundMutate((prev) => prev && {
            ...data,
            isLiked: !data.isLiked
        }, false)
        //mutate("/api/users/me", (prev:any) => ({ok: !prev.ok}), false);
        toggleFav({});
    };

    return (
        <Layout canGoBack>
            <div className="px-4  py-4">
                <div className="mb-8">
                    <div className={"relative pb-[30rem]"}>
                        <Image layout={"fill"}
                               src={`https://imagedelivery.net/ocHTg6vBdHcjOsgK1jhiKg/${data?.product?.image}/public`}
                               className="h-96 bg-slate-300 object-cover"/>
                    </div>
                    <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
                        <Image
                            height={48}
                            width={48}
                            src={`https://imagedelivery.net/ocHTg6vBdHcjOsgK1jhiKg/${data?.product?.user?.avatar}/avatar`}
                            className="w-12 h-12 rounded-full bg-slate-300"/>
                        <div>
                            <p className="text-sm font-medium text-gray-700">{data?.product?.user?.name}</p>
                            <Link href={`/users/profile/${data?.product?.user?.id}`}>
                                <p className="text-xs font-medium text-gray-500">
                                    View profile &rarr;
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h1 className="text-3xl font-bold text-gray-900">{data?.product?.name}</h1>
                        <span className="text-2xl block mt-3 text-gray-900">${data?.product?.price}</span>
                        <p className=" my-6 text-gray-700">
                            {data?.product?.description}
                        </p>
                        <div className="flex items-center justify-between space-x-2">
                            <Button large text="Talk to seller"/>
                            <button
                                onClick={onFavClick}
                                className={cls(
                                    "p-3 rounded-md flex items-center justify-center hover:bg-gray-100",
                                    data?.isLiked ? " text-red-500  hover:text-red-600" : " text-gray-500 hover:text-gray-600")}>
                                {data?.isLiked ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        < path fillRule="evenodd"
                                               d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                               clipRule="evenodd"/>
                                    </svg>
                                    :
                                    <svg
                                        className="h-5 w-5 "
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
                    <div className=" mt-6 grid grid-cols-2 gap-4 cursor-pointer">
                        {data?.relatedProduct?.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`}>
                                <div key={product.id}>
                                    <div className="h-56 w-full mb-4 bg-slate-300"/>
                                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                                    <span className="text-sm font-medium text-gray-900">{product.price}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default ItemDetail;
