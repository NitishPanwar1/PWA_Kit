import React from 'react'
import fetch from 'cross-fetch'
import {Badge, ListItem, Divider, UnorderedList} from '@chakra-ui/react'
import Link from '../../components/link'

const ContentSearch = (props) => {
    if (!props.contentResult) {
        return <div>Loading...</div>
    }
    const {hits = []} = props.contentResult
    return (
        <div>
            {hits.length ? (
                <UnorderedList>
                    {hits.map(({id, name}) => (
                        <>
                            <Link key={id} to={`/content/${id}`}>
                                <ListItem>
                                    <Badge colorScheme="purple">{name}</Badge>
                                </ListItem>
                            </Link>
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                        </>
                    ))}
                </UnorderedList>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    const res = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/RefArch/dw/shop/v21_3/content_search?q=about&client_id=96c08967-8fcc-49be-a666-db50da2c33aa`
    )
    if (res.ok) {
        contentResult = await res.json()
        console.log(contentResult)
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {contentResult}
}
ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch
