
class Order {
    constructor(id, items, totalAmount,name,address,email,mobile,pincode, date){
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.name = name;
        this.address = address;
        this.email = email;
        this.mobile = mobile;
        this.pincode = pincode;
        this.date = date
    }

    get readableDate(){
        return this.date.toLocaleDateString('en-EN',{
            year:'numeric',
            month:'long',
            day:'numeric',
            hour:'2-digit',
            minute:'2-digit'
        });
        // return moment(this.date).format('MMMM Do YYYY, hh:mm')
    }
}

export default Order;