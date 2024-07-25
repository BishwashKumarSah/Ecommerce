class ProductClass {
    constructor(query, queryObj) {
        this.query = query;
        this.queryObj = queryObj
    }

    search() {
        // it is basically anything after "?" eg: ?[name = 'apple'& description:'phone']

        var search = ''
        if (this.queryObj.search) {
            search = this.queryObj.search
        }

        const queryObj = search ? {
            $or: [
                {
                    name: {
                        $regex: search,
                        $options: 'i'
                    },
                }, {
                    description: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ]
        } : {}

        // here this.query = (Product.find()) => which is also an object. here we are modifying the query to search for specific products 
        // ie. http://localhost:8000/api/v1/products?search="Apple" here search="Apple" is the this.queryObj so we are modifying this.query method to 
        // Product.find().find(queryObj) 

        this.query = this.query.find({ ...queryObj })

        // console.log("after",await this.query);
        // The reason we are returning this is because we can want to chain .sort().filter().search().
        //  since all of them are the methods of ProductClass so we can only use it on instance of ProductClass ie. const query = new ProductClass(Product.find(), req.query).search();
        // here  query is an instance of  new ProductClass. without this we cannot chain methods.

        return this;
    }

    filter() {
        let queryObjCopy = { ...this.queryObj }
        const removeFields = ["search", "page", "limit"];
        removeFields.map(field => {
            delete queryObjCopy[field];
        })
        queryObjCopy = JSON.stringify(queryObjCopy);
        queryObjCopy = queryObjCopy.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)

        this.query = this.query.find(JSON.parse(queryObjCopy));
        return this
    }

    pagination(resultPerPage) {
        const currentPage = this.queryObj.page || 1;
        const skip = resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }

}

module.exports = ProductClass;