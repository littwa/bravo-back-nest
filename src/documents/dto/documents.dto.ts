import { Product } from "src/products/products.schema";
import { EStatus } from "src/shared/enums/role.enum";
import { IDate } from "src/shared/interfaces/prop.interfaces";

export class documentsOrderDto {
    readonly documentNo: string;
    readonly documentId: string;
    readonly document: string;
    readonly documentItems: string;
    readonly documentNotes: string;
    readonly status: string;
    readonly ordered: string;
}
