import React from 'react'
import Service from '../../utils/http';
import { useState } from 'react';
import { useEffect } from 'react';
import { Avatar, Container, Stack, Text } from '@mantine/core';
export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
      
    };
    useEffect(
        () => { fetchUser() }, []
    );
    if (loading) {
       
    }
    if (!user) {
     
    }
        return (
 <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Stack>
        </Container>
    
    )
}

