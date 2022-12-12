class ErrorHandler extends Error{

    constructor(message,statusCode) {
        super(message);//super is constr of Erro class which is inherrited
        this.statusCode=statusCode;

        Error.captureStackTrace(this, this.constructor);//we can use fnn of inherited class(Error)   //saare errors ka stack bana dega

    }
}

export default ErrorHandler; 
// cookie parser-->generted token visible ho from front end
// validator-->email ke jagaha email hi aaye vo check karne ke leye
// nodemailer-->after forgate password mail karne ke leye
// bodyparser-->responsible for parsing the incoming request bodies in a middleware before you handle it
// jsonwebtoken-->to create a token
// bcryptjs-->to convert password into hashed password
