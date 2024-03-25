/**
   * Create Code from Name
   * @param name
   * @returns
   */
export const createCode = (name: string) => {
    const code = name.replace(/[^A-Z]/g, '');
    if(code.length === 0) {
        return name[0].toUpperCase();
    }else{
        return code;
    }
};