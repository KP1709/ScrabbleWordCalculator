import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_DATABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async (event) => {

    const { word } = event.queryStringParameters || {};

    // Not called as it's intercepted if the string is empty so won't call the API
    // if (!word) {
    //     return {
    //         statusCode: 400,
    //         body: JSON.stringify({ error: 'Query parameter is required.' }),
    //     };
    // }

    try {
        let { data, error } = await supabase
            .from('Words')
            .select('word')
            .eq('word', word)

        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            };
        }

        if (data?.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Word not found.' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ data }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
