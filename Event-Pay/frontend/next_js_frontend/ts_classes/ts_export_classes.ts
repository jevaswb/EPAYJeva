//export type Currency  = "€" |"$" | "£"
export enum Currency{
    "€" = "€",
    "$" = "$", 
    "£" = "£"
}
export function toCurrenyEnumValue(value:string):Currency | null{
    switch(value){
        case "€" : return Currency["€"]
        case "$" : return Currency["$"]
        case "£" : return Currency["£"]
        default : return null
    }
}
 
export class Data {
    public test_key:string = ""
    public user_id:string = ""
    public screen_name:string = ""
    public event_name:string = ""
    public name:string = ""
    public email:string = ""
    public participant_id:string = ""
    public event_id:string = ""
    public date:string = ""
    public start_time:string = ""
    public currency:Currency | null = null
    public price:number | null = null
    public participant_array: string[] = []
    public event_array: string[] = []
    
    constructor(test_key:string ,user_id:string){
        this.test_key = test_key
        this.user_id = user_id
    }
    
}

export class ReturnObject{
    public error:boolean = false
    public message: string | null = null
    public data:any = null

    constructor(error:boolean, message:string, data:any){
        this.error = error
        this.message = message
        this.data = data
    }
}