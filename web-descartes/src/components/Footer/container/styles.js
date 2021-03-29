import styled from 'styled-components';

export const Container = styled.div`
    padding: 5% 10%;
    background: #6CB9AA;
    margin-top: 5%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

`

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    #IconEndereco {
        margin-left: 30px;
    }
    #IconEmail, #IconEndereco{
        margin-right: 15px;
    }
`

export const Row = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    #IconInstagram {
        margin-left: 25px;
        margin-right: 10px;
        margin-bottom: 30px;
    }
    a {
        text-decoration: none;
        font-size: 10pt;
        color: #352166;
    }
    a:hover {
        font-weight: bold;
        transition: 200ms ease-in;
    }
`

export const Link = styled.div`
    font-size: 10pt;
    color: #352166;
    
`

export const Title = styled.div`
    color: #352166;
    font-weight: bold;
    #TextOne {
        font-size: 14px;
        text-align: center;
        margin-top: 50px;
        margin-bottom: 15px;
    }
    #TextTwo{
        font-weight:400;
        margin-top: 30px;
        font-size: 14px;

    }
`