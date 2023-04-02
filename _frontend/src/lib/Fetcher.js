import useSWR from 'swr'
import config from "../../config.json"

const response = (...args) => fetch(...args).then(res => res.json())

export default function Fetcher(endpoint)
{
    const {data, error} = useSWR(config.SERVER_URL+endpoint, response)

    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}



