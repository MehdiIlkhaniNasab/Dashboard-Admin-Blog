import supabaseConfig from "../config/supabaseConfig.js";

async function insertData(tableName, data) {
    const { error } = await supabaseConfig
        .from(tableName)
        .insert([data])
    if (error) {
        console.log(error);
        return false
    }

    return true
}

export { insertData }