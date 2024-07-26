const data = [
    {
        _id: 1,
        productName: "Dr Martens Loafers",
        productImgUrl:
            "https://s3-alpha-sig.figma.com/img/ba25/1b09/041d479fb65580fc227a1914bae80063?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LMZvAehnzckorl5PW7AAxREhbqsr5CeE9fPSsNR1Q1DodNBXFP6fpq7XEUW4b1uG~tUbOf-xQfT4iGQuKYb-M~n0nGN4RFsA6ckn1l1AE~u~51ljA74RZJqOTB5gtTCAJX2hmR4ryeg5vh4rCuqzO6asE4K8BgIVlF2fGBRv3IICQpFGVUyGRKCvmeKT1oLnw3FqijaEqehO31uZN4cP4YQZSANcMMj6oK9GxnGg3n8nStsQwSzAxokIKMkqbJMiY61tV~eJuZ9VZ8I9jnZzj~5E9YudCqvxximSsJUvoEQy6b~nup5H3xkZ1tOCiSILVKzPa7f2nykOXI1hhNvvTg__",
        price: "54,996",
        description: "This loafers is available only in black and the sole is about “1.8” inches tall. It is unisex and can be styled with a jean, gown and skirts.",
        size: '40 41 42 45 46',
        category: "fashion",
        rating: Math.floor(Math.random() * 6),
        seller: {
            name: 'Fidel Wole',
            img: "https://s3-alpha-sig.figma.com/img/2104/bc2f/adefcaa6f4c1304515bd5ff6178d261a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jEtPSytgX3R0XM5GVEN-n1-yuxjK0Rm6SL3S03QdKe2LLZXz07EeuhPuClZ21CuQfnFuymIFc1CmfvRyuIjMLtM9DwsXS~SLgxplpmZ1VWOfxvYSSdWmMXy2BOWYMzIKdCs6Cvn7il2PNm3IngWJjS8HJG0TdcPowm1M7QJTcngCmCqo5A0rLxtM96RyrSzHeZlb2mRr7J4iHQiojPihi2rYE0iODnPNFThjABO0yFMRO5-sLWY6scQO3I90RmNyvVzR2j98myjx1rBcKtqHX5TE85u~X9~7cq~tmdASd1lg8lcIWkA-01PigPhAcE4neTrIxDeog3dbAp9vkPvoAA__"
        }
    },
    {
        _id: 2,
        productName: "Button-down shirt",
        productImgUrl:
            "https://s3-alpha-sig.figma.com/img/adc5/df0a/6b1e8582b31cfafc3eb0042edab18f7c?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oUzzWsHexQFCyoUwhQJu5gJ3GEDoZuCEsgBjGs-eUMu5UM7jxnkE63HanNJ3uMZqV6kSp~HvHDXDERMxvEAtfNbSqu2ZlFJJ7pLcNEWcO5VmkWLHbysakPFtH7IXHNWs071IkisJHgxEk1j4-ZAQFvPn2lQZVakFrE7r58IZcQiNkPyk40Di5~e3mU9nGoBpYDQepXFzqZ6BOi7c1IGVFpOhMM9ssYdoI36E5Wr0SEqg62Ebl0w1mf0q6lKWwh-fCiSG0jx4nJnRPuICzUnJ6o~FCoAM69qEnQi8bKPeuEsz9K8D8PH2jYnZPfg1MB1C14NOUF-hOrpU4fHs696EfA__",
        price: "7,996",
        description: "This shirt is available only in black",
        size: 'sm md lg',
        category: "fashion",
        rating: Math.floor(Math.random() * 6),
        seller: {
            name: 'Omoba prince',
            img: "https://s3-alpha-sig.figma.com/img/2104/bc2f/adefcaa6f4c1304515bd5ff6178d261a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jEtPSytgX3R0XM5GVEN-n1-yuxjK0Rm6SL3S03QdKe2LLZXz07EeuhPuClZ21CuQfnFuymIFc1CmfvRyuIjMLtM9DwsXS~SLgxplpmZ1VWOfxvYSSdWmMXy2BOWYMzIKdCs6Cvn7il2PNm3IngWJjS8HJG0TdcPowm1M7QJTcngCmCqo5A0rLxtM96RyrSzHeZlb2mRr7J4iHQiojPihi2rYE0iODnPNFThjABO0yFMRO5-sLWY6scQO3I90RmNyvVzR2j98myjx1rBcKtqHX5TE85u~X9~7cq~tmdASd1lg8lcIWkA-01PigPhAcE4neTrIxDeog3dbAp9vkPvoAA__"
        }
    },
    {
        _id: 3,
        productName: "Comfy Unisex Slide",
        productImgUrl:
            "https://s3-alpha-sig.figma.com/img/f2e5/5fa8/8804a55c1b0e4d8c2120ca0b8c26432e?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TOb0oOcQvo0GU-YgurywBvyGDpkTZsKxjpEREJWnW8Tr0uLJ-JOnTZDPqwa2x-2mD~28tFpTUfdmGzjh6pzhwLQyIsqulNUakc5llG3NgtAw9eEFIjQobuoY-w7fQwgg8PDBYRTeQLaxqc4Ae2PcgQYHkWRkNdcymYVhGb6Fl8zgVMxmJCGCCWfyTBpRVJVioFfBuA6tgMwYWFRB-wcdcheyZRgnklLWHwAL~9JwwtR~61nh4tDJ-IjTMPKV2Xyl2PKQESKDazg8GRu4XCSTk6mn9f~eF-NEEcA44B2tkIZ4DbwBFwe9PU9sV9rsxgGIruNnZJ788Xt2IuQa4zfBeg__",
        price: "10,996",
        description: "This slide is available only in black and the sole is about “1.8” inches tall. It is unisex and can be styled with a jean, gown and skirts.",
        size: '40 41 42 45',
        category: "fashion",
        rating: Math.floor(Math.random() * 6),
        seller: {
            name: 'joy ayo',
            img: "https://s3-alpha-sig.figma.com/img/2104/bc2f/adefcaa6f4c1304515bd5ff6178d261a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jEtPSytgX3R0XM5GVEN-n1-yuxjK0Rm6SL3S03QdKe2LLZXz07EeuhPuClZ21CuQfnFuymIFc1CmfvRyuIjMLtM9DwsXS~SLgxplpmZ1VWOfxvYSSdWmMXy2BOWYMzIKdCs6Cvn7il2PNm3IngWJjS8HJG0TdcPowm1M7QJTcngCmCqo5A0rLxtM96RyrSzHeZlb2mRr7J4iHQiojPihi2rYE0iODnPNFThjABO0yFMRO5-sLWY6scQO3I90RmNyvVzR2j98myjx1rBcKtqHX5TE85u~X9~7cq~tmdASd1lg8lcIWkA-01PigPhAcE4neTrIxDeog3dbAp9vkPvoAA__"
        }
    },
    {
        _id: 4,
        productName: " 16” inch Bob wig",
        productImgUrl:
            "https://s3-alpha-sig.figma.com/img/88e9/4a03/ff5fe3ccfebe8db1fda375facad99be8?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ca52l6dD5-vchX-ZElQ008ymKNoUJ41HuhEMhMJiv5sMTluCKYZP-JFv4YIk5DgH5EbP~z1cixbr9ooMLGI-4xj4nBAMPBCyE7WzvN5ElG1xTx15qY25QwsyDJZAC1GE1-MrFPlnlbr-9P6QucMzAtjw0Urr17aG3IxzbbwcnzNg23LdMKrIqwCrk8aSDqL~llCNSf24Kb9PkFJhSZT-jXjVPNCO~uT-dABxi9w3RYtM0BjLoXV4cBZHKIp-zMssQr2f8YF7pLiL6p6fe2O3ISvDaLCKvn9oEBtc7ea5F8Mk2tNEgaOP2lCJRgSXi3omcH5iCZnfspCJjs29-bbNVw__",
        price: "350,000",
        description: "This wig is available only in black and 32inch 40inch 20inch",
        size: '32inch 40inch 20inch',
        category: "fashion",
        rating: Math.floor(Math.random() * 6),
        seller: {
            name: 'tobi big',
            img: "https://s3-alpha-sig.figma.com/img/2104/bc2f/adefcaa6f4c1304515bd5ff6178d261a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jEtPSytgX3R0XM5GVEN-n1-yuxjK0Rm6SL3S03QdKe2LLZXz07EeuhPuClZ21CuQfnFuymIFc1CmfvRyuIjMLtM9DwsXS~SLgxplpmZ1VWOfxvYSSdWmMXy2BOWYMzIKdCs6Cvn7il2PNm3IngWJjS8HJG0TdcPowm1M7QJTcngCmCqo5A0rLxtM96RyrSzHeZlb2mRr7J4iHQiojPihi2rYE0iODnPNFThjABO0yFMRO5-sLWY6scQO3I90RmNyvVzR2j98myjx1rBcKtqHX5TE85u~X9~7cq~tmdASd1lg8lcIWkA-01PigPhAcE4neTrIxDeog3dbAp9vkPvoAA__"
        }
    },
    {
        _id: 5,
        productName: "Knuckle rings",
        productImgUrl:
            "https://s3-alpha-sig.figma.com/img/e7f5/7191/9739934908da2645275d4d97012b74af?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sy8pE-PIvBbX8MM~gKFBibhWsZdudzDot8RuAZKg7YijPmH0jHFJqI~rNd6PQ30gbRVuPe8bYVvcMjd7Q~Tlqx0NJgoHNlb-dGmqxYnabhCD3ZSsn0lTVPM63zgM89-MPwlWyDqX5QqHwRmoMKXPxj7mKYtmM4wpjZvvUjXDmmy20Oo1OQdijRLEQYBKMLlga57QxWyJY-lNFsF~d23oL5cwdhjvol~WrSJuV2de6-7FnEfz4Edb68DbyC-lrb7AmQh1XD1P1iEOE4SuWEa91qeL~x0dNWcWwxBQ2DqfZcgEFFFt~pw9-WnL~YOGW52c2kCBUU3kv0WJHB~Sr1frLQ__",
        price: "3,000 per one",
        description: "Knuckle ring for both male and female",
        size: 'sm md lg',
        category: "fashion",
        rating: Math.floor(Math.random() * 6),
        seller: {
            name: 'grace aanu',
            img: "https://s3-alpha-sig.figma.com/img/2104/bc2f/adefcaa6f4c1304515bd5ff6178d261a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jEtPSytgX3R0XM5GVEN-n1-yuxjK0Rm6SL3S03QdKe2LLZXz07EeuhPuClZ21CuQfnFuymIFc1CmfvRyuIjMLtM9DwsXS~SLgxplpmZ1VWOfxvYSSdWmMXy2BOWYMzIKdCs6Cvn7il2PNm3IngWJjS8HJG0TdcPowm1M7QJTcngCmCqo5A0rLxtM96RyrSzHeZlb2mRr7J4iHQiojPihi2rYE0iODnPNFThjABO0yFMRO5-sLWY6scQO3I90RmNyvVzR2j98myjx1rBcKtqHX5TE85u~X9~7cq~tmdASd1lg8lcIWkA-01PigPhAcE4neTrIxDeog3dbAp9vkPvoAA__"
        }
    },
    {
        _id: 6,
        productName: "Mini HandBag",
        productImgUrl:
            "https://s3-alpha-sig.figma.com/img/1537/9186/4ddc4e79bb6ae3046079f5e06345264c?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=khXbfLeZlCfsmvNXk97GrUKnAc640z~2uLQmNiWnBiBCOTLF2GW4JQrXa509lClBukE7gQiKGvpYmMEJw~kEGScppkmge9gYW2UUVEJ~Ix8ZwboX0uzFM1nV79UsAv7SLghMMfKC3qveuAcVNrCq5HPXh7B5qTEgJOXz5qwJiOLFUIEOiTKerHzKhofaQEEQ~Z1eFglL0DSxvTq0SxE9-LYFIEwRQdM2Y9PSymWuUmMoIBJiNDWn-P2ChLfw7b0A4JnGGu3AJUBP2FUN1ZDr0UkfX06hHzGJMeEVw6Apy4OMKVxKtjUIaXjJXAAZz3XbZ9g0XBLFe7U2W5MDAlLtYA__",
        price: "30,996",
        description: "This loafers is available only in black and the sole is about “1.8” inches tall. It is unisex and can be styled with a jean, gown and skirts.",
        size: '40 41 42 45 46',
        category: "fashion",
        rating: Math.floor(Math.random() * 6),
        seller: {
            name: 'dada okan',
            img: "https://s3-alpha-sig.figma.com/img/2104/bc2f/adefcaa6f4c1304515bd5ff6178d261a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jEtPSytgX3R0XM5GVEN-n1-yuxjK0Rm6SL3S03QdKe2LLZXz07EeuhPuClZ21CuQfnFuymIFc1CmfvRyuIjMLtM9DwsXS~SLgxplpmZ1VWOfxvYSSdWmMXy2BOWYMzIKdCs6Cvn7il2PNm3IngWJjS8HJG0TdcPowm1M7QJTcngCmCqo5A0rLxtM96RyrSzHeZlb2mRr7J4iHQiojPihi2rYE0iODnPNFThjABO0yFMRO5-sLWY6scQO3I90RmNyvVzR2j98myjx1rBcKtqHX5TE85u~X9~7cq~tmdASd1lg8lcIWkA-01PigPhAcE4neTrIxDeog3dbAp9vkPvoAA__"
        }
    },
    {
        _id: 7,
        productName: "Mini HandBag",
        productImgUrl:
            "https://s3-alpha-sig.figma.com/img/1537/9186/4ddc4e79bb6ae3046079f5e06345264c?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=khXbfLeZlCfsmvNXk97GrUKnAc640z~2uLQmNiWnBiBCOTLF2GW4JQrXa509lClBukE7gQiKGvpYmMEJw~kEGScppkmge9gYW2UUVEJ~Ix8ZwboX0uzFM1nV79UsAv7SLghMMfKC3qveuAcVNrCq5HPXh7B5qTEgJOXz5qwJiOLFUIEOiTKerHzKhofaQEEQ~Z1eFglL0DSxvTq0SxE9-LYFIEwRQdM2Y9PSymWuUmMoIBJiNDWn-P2ChLfw7b0A4JnGGu3AJUBP2FUN1ZDr0UkfX06hHzGJMeEVw6Apy4OMKVxKtjUIaXjJXAAZz3XbZ9g0XBLFe7U2W5MDAlLtYA__",
        price: "30,996",
        description: "This loafers is available only in black and the sole is about “1.8” inches tall. It is unisex and can be styled with a jean, gown and skirts.",
        size: '40 41 42 45 46',
        category: "fashion",
        rating: Math.floor(Math.random() * 6),
        seller: {
            name: 'dada okan',
            img: "https://s3-alpha-sig.figma.com/img/2104/bc2f/adefcaa6f4c1304515bd5ff6178d261a?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jEtPSytgX3R0XM5GVEN-n1-yuxjK0Rm6SL3S03QdKe2LLZXz07EeuhPuClZ21CuQfnFuymIFc1CmfvRyuIjMLtM9DwsXS~SLgxplpmZ1VWOfxvYSSdWmMXy2BOWYMzIKdCs6Cvn7il2PNm3IngWJjS8HJG0TdcPowm1M7QJTcngCmCqo5A0rLxtM96RyrSzHeZlb2mRr7J4iHQiojPihi2rYE0iODnPNFThjABO0yFMRO5-sLWY6scQO3I90RmNyvVzR2j98myjx1rBcKtqHX5TE85u~X9~7cq~tmdASd1lg8lcIWkA-01PigPhAcE4neTrIxDeog3dbAp9vkPvoAA__"
        }
    },
];

export default data