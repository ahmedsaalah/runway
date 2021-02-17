import { Common } from "./common";
import { Country} from "./country";

export interface User extends Common {
  phone?: string;
  first_name?: string;
  last_name?:string;
  avatar?:string;
  email?: string;
  country?:Country;
  password?:string;
  password_confirmation?:string;
}
