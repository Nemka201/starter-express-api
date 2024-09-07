const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

// Ruta donde se guardarán las noticias (adapta la ruta según tu proyecto)
const newsFilePath = path.join(__dirname, '../data/news.json');

// Función para guardar una noticia
const createNews = async (req, res) => {
    try {
        const newNews = req.body;

        // Leer el contenido actual del archivo JSON
        let newsData = await fs.readFile(newsFilePath, 'utf8');
        newsData = newsData ? JSON.parse(newsData) : [];

        // Agregar la nueva noticia al array
        newsData.push(newNews);

        // Escribir el array actualizado en el archivo JSON
        await fs.writeFile(newsFilePath, JSON.stringify(newsData, null, 2));

        res.status(201).json({ message: 'Noticia creada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la noticia' });
    }
};

// Función para obtener todas las noticias
const getAllNews = async (req, res) => {
    try {
        const newsData = await fs.readFile(newsFilePath, 'utf8');
        const news = newsData ? JSON.parse(newsData) : [];
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las noticias' });
    }
};

// Función para obtener los últimos 10 posts a partir de un índice
const getLatestNews = async (req, res) => {
    try {
        const { index = 0 } = req.query; // Obtener el índice de la página, por defecto 0
        const pageSize = 10; // Tamaño de página

        const newsData = await fs.readFile(newsFilePath, 'utf8');
        const news = newsData ? JSON.parse(newsData) : [];

        // Ordenar las noticias en orden descendente por fecha (si tienes un campo de fecha)
        news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Obtener los últimos 10 posts a partir del índice
        const paginatedNews = news.slice(index, index + pageSize);

        res.json(paginatedNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las noticias' });
    }
};

// Función para eliminar una noticia por ID
const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        let newsData = await fs.readFile(newsFilePath, 'utf8');
        let news = newsData ? JSON.parse(newsData) : [];

        // Encontrar el índice del post a eliminar
        const index = news.findIndex(post => post.id === id);

        if (index !== -1) {
            news.splice(index, 1);
            await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2));
            res.json({ message: 'Noticia eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Noticia no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la noticia' });
    }
};

// Función para modificar una noticia por ID
const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        let newsData = await fs.readFile(newsFilePath, 'utf8');
        let news = newsData ? JSON.parse(newsData) : [];

        // Encontrar el índice del post a modificar
        const index = news.findIndex(post => post.id === id);

        if (index !== -1) {
            news[index] = { ...news[index], ...updatedData };
            await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2));
            res.json({ message: 'Noticia modificada correctamente' });
        } else {
            res.status(404).json({ message: 'Noticia no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al modificar la noticia' });
    }
};

module.exports = {
    createNews, deleteNews, updateNews, getAllNews, getLatestNews
};