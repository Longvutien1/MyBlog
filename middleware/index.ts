

export const countCharacters300 = (value:String) => {
    const count = value.length;
       const daCat =  value.substring(0,300);
    
    return daCat + "......."
}

export const countCharacters100 = (value:String) => {
    const count = value.length;
       const daCat =  value.substring(0,100);
    
    return daCat + "......."
}