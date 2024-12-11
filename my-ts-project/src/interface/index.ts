export interface IFIND {
  find<T>(id: string | number, query?: string): Promise<T[]>;
}

export interface IGET {
  get<T>(query?: string): Promise<T[]>;
}

export interface IPOST {
  post<T>(payloads?: T | any): Promise<T>;
}

export interface IPATCH {
  patch<T>(id: string | number | any, payloads?: T | any): Promise<T>;
}
