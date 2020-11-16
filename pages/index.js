import Axios from 'axios';
import Head from 'next/head';
import {useEffect, useState} from "react";
import { Divider, Header } from 'semantic-ui-react';
import ItemList from '../src/component/ItemList';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export default function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

  function getData() {
    Axios.get(API_URL).then(res => {
      console.log(res.data);
      setList(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Home | WhiteCarrot</title>
      </Head>

      {isLoading ? (
        <div style={{padding: "300px 0"}}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      ) : (
        <div>
          <Header as="h3" style={{paddingTop: 40}}>
            Best Items
          </Header>
          <Divider/>
          <ItemList list={list.slice(0, 9)} />

          <Header as="h3" style={{paddingTop: 40}}>
            latest Items
          </Header>
          <Divider/>
          <ItemList list={list.slice(9)} />
        </div>
      )}

    </div>
  )
}
