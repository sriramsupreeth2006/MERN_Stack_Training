import React, { useState, useEffect } from 'react';
import Service from '../../utils/http';
import { Button, Modal } from '@mantine/core';
import { Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
export const URLHistory = () => {
  const [opened, { open, close }] = useDisclosure(false);  
  const [updatedData, setUpdatedData] = useState([]);
  const Service = new Service();  
  const [data, setData] = React.useState([]);
  const fetchHistory = async () => {
    try {
        const response = await new Service().get("user/my/urls");
        console.log(response.shortUrl);
        setData(response.shortUrl);
    }
    catch (error) {
        console.error(error);
    }
  }
  useEffect(() => {
    fetchHistory();
  }, [])
   const rows = elements.map((element) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.OriginalURL}</Table.Td>
      <Table.Td>{element.shortCode}</Table.Td>
      <Table.Td>{element.clickCount}</Table.Td>
      <Table.Td>{element.CreatedAt}</Table.Td>
      <Table.Td>{element.ExpiresAt}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Original URL</Table.Th>
          <Table.Th>Short URL</Table.Th>
          <Table.Th>Clicks</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Expires</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
    </Table>
  );
}

export default URLHistory
