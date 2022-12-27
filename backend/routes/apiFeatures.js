class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;//khudke class ka jo query variable hai usko contructor ke dwara jo value aaye the usko 
                        //assign karleya using this so that we can use them in out class's fns
    this.queryStr = queryStr;
  }

  search() {
    console.log(this.queryStr.keyword);
    const keyword =
     ( this.queryStr.keyword != "null" && this.queryStr.keyword)
        ? {
            name: {
              $regex: this.queryStr.keyword, // regex keyword from mongo db help us to search such that if query present in any where it will be in search results

              $options: "i", //makes no case sensative
            },
          }
        : {};
    //  console.log(keyword);
    this.query = this.query.find({...keyword}); //query get updated

    return this; //return class itself
  }

  filter() {
    // const queryCopy=this.queryStr; //if we do by this method it will not make copy ie if we change queryCopy, this.queryStr will also change
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);
    //qury copy mai bohot saare cheeze aajayege like keywar="xx" pagr={8} limit=10 category="laptop"  we just want category
    //removing other fields
    const removeFields = [ "keyword","page", "limit"];

    
    // this.query=this.query.find(queryCopy);

    //filter for price and rating
    // console.log(queryCopy)

    let queryStr = JSON.stringify(queryCopy);
     queryStr = queryStr.replace(
       /\b(gt|gte|lt|lte)\b/g,
       (match) => `$${match}`
     );; //replacement aise kuvh /\b(gt|gte|lt|lte)

    removeFields.forEach((key) => delete queryCopy[key]);
    console.log(queryCopy);
    this.query = this.query.find(JSON.parse(queryStr));

    // console.log(queryStr);

    return this;
  }
  pagination(resultPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = resultPerPage * (currentPage - 1);
    console.log("total skip: " + skip);
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
