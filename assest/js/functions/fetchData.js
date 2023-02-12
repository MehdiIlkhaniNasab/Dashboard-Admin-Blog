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

async function getAllData(tableName) {
    const { data, error } = await supabaseConfig
        .from(tableName)
        .select()
    if (error && data.length == 0) return false


    return data
}

async function getSingleData(tableName,id) {
    const { data, error } = await supabaseConfig
        .from(tableName)
        .select()
        .eq('id', id)
    if (error && data.length == 0) return false
    return data
}

async function getSpecificData(tableName,key,value) {
    const { data, error } = await supabaseConfig
        .from(tableName)
        .select()
        .eq(key, value)
    if (error && data.length == 0) return false
    return data
}

async function deleteData(tableName,id) {
    const { error } = await supabaseConfig
        .from(tableName)
        .delete()
        .eq('id', id)
    if (error) return false


    return true
}

export { insertData, getAllData, getSingleData , deleteData, getSpecificData }