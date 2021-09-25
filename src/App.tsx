import React, { useEffect, useState } from 'react';

import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import * as MI from '@material-ui/icons/';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import './App.css';
import { api } from './api';

type Repository = {
    id: number;
    name: string;
    owner: string;
    url: string;
    createdAt: string;
    lastUpdate: string;
}

type ApiRepository = {
    id: number;
    name: string;
    owner: {
        login: string;
    };
    svn_url: string;
    created_at: string;
    updated_at: string;
}

function App(): JSX.Element {
    const [search, setSearch] = useState<String>('');
    const [page, setPage] = useState<Number>(0);
    const [repoList, setRepoList] = useState<Repository[]>([]);
    const [firstSearch, setFirstSearch] = useState<boolean>(false);

    const columns = [
        {
            field: 'name',
            headerName: 'Nome do Repositório',
        },
        {
            field: 'owner',
            headerName: 'Dono do repositório',
        },
        {
            field: 'createdAt',
            headerName: 'Data de criação',
        },
        {
            field: 'lastUpdate',
            headerName: 'Última atualização',
        },
        {
            field: 'url',
            headerName: 'Link do repositório',
        },
    ];

    function changeSearch(event: { target: { value: React.SetStateAction<String>; }; }) {
        setFirstSearch(true);
        setSearch(event.target.value);
    }

    async function searchByLanguage(): Promise<void> {
        setFirstSearch(true);
        setPage(1);
        const response = await api.get(`repositories?q=language:${search}&page=${page}&per_page=15`);
        const repositories = response.data.items;
        const formattedRepositories = repositories.map((repo: ApiRepository) => {
            const formatRepo: Repository = {
                id: repo.id,
                name: repo.name,
                owner: repo.owner.login,
                url: repo.svn_url,
                createdAt: format(new Date(repo.created_at), 'dd/MM/yyyy', {
                    locale: ptBR,
                }),
                lastUpdate: format(new Date(repo.updated_at), 'dd/MM/yyyy', {
                    locale: ptBR,
                }),
            }
            return formatRepo;
        });
        setRepoList(formattedRepositories);
        setFirstSearch(false);
    }

    function handleBack() {
        setPage((activePage) => Number(activePage) - 1);
    }
    function handleNext() {
        setPage((activePage) => Number(activePage) + 1);
    }

    useEffect(() => {
        async function searchByPage() {
            const response = await api.get(`repositories?q=language:${search}&page=${page}&per_page=15`);
            const repositories = response.data.items;
            const formattedRepositories = repositories.map((repo: ApiRepository) => {
            const formatRepo: Repository = {
                id: repo.id,
                name: repo.name,
                owner: repo.owner.login,
                url: repo.svn_url,
                createdAt: format(new Date(repo.created_at), 'dd/MM/yyyy', {
                    locale: ptBR,
                }),
                lastUpdate: format(new Date(repo.updated_at), 'dd/MM/yyyy', {
                    locale: ptBR,
                }),
            }
            return formatRepo;
        });
        setRepoList(formattedRepositories);
        }

        if(!firstSearch) {
            searchByPage();
        }
    }, [page, search, firstSearch]);

    return (
        <div className='App'>
            <div className='SearchBar'>
                <TextField
                    name='search'
                    label='Buscar por linguagem'
                    variant='outlined'
                    onChange={changeSearch}
                />
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={searchByLanguage}
                >
                    Buscar
                </Button>
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell>
                                {column.headerName}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repoList.map((repo) => (
                            <TableRow key={repo.id}>
                                <TableCell>{repo.name}</TableCell>
                                <TableCell>{repo.owner}</TableCell>
                                <TableCell>{repo.createdAt}</TableCell>
                                <TableCell>{repo.lastUpdate}</TableCell>
                                <TableCell>{repo.url}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>  
            </div>
            <div className='ButtonWrapper'>
                <Button
                    variant='contained'
                    size='large'
                    color='primary'
                    onClick={handleBack}
                    startIcon={<MI.ChevronLeft />}
                    disabled={page <= 1}
                >
                    Página anterior
                </Button>  
                <Button
                    variant='contained'
                    size='large'
                    color='primary'
                    onClick={handleNext}
                    endIcon={<MI.ChevronRight />}
                >
                    Próxima página
                </Button>
            </div>
        </div>
    );
}

export default App;
