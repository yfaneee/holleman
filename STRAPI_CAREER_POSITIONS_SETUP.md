# Strapi Setup for Career Positions

## Content Type: cariere-positions

This document describes how to set up the career positions in Strapi for the Holleman website.

### Content Type Configuration

**Collection Name:** `cariere-positions`
**API ID:** `cariere-position`
**Display Name:** `Cariere Positions`

### Fields

1. **title** (Text)
   - Field name: `title` 
   - Type: Text
   - Required: Yes
   - Description: The job position title (e.g., "Șofer transport agabaritic internațional")

2. **description** (Text)
   - Field name: `description`
   - Type: Text (Long text)
   - Required: Yes
   - Description: The job description/requirements shown on hover

### API Endpoint

The frontend fetches data from:
```
GET https://holleman-cms-production.up.railway.app/api/cariere-positions?populate=*
```

### Expected Response Format

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Șofer transport agabaritic internațional",
        "description": "Cerinte: permis C+E, experiență în transporturi speciale, cunoștințe ADR – constituie un avantaj",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    },
    {
      "id": 2,
      "attributes": {
        "title": "Coordonator logistică / dispecer", 
        "description": "Responsabilități: planificarea rutelor, relația cu șoferii și partenerii externi, optimizarea costurilor",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z", 
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

### Frontend Integration

The frontend code automatically:
- Fetches positions from the API on page load
- Displays each position with title and description
- Shows a "no positions available" message if the array is empty
- Falls back gracefully if the API fails

### Setup Steps in Strapi Admin

1. Go to Content-Types Builder
2. Create new Collection Type: `cariere-positions`
3. Add fields:
   - `title` (Text, required)
   - `description` (Long text, required)
4. Save and restart Strapi
5. Go to Content Manager > Cariere Positions
6. Add position entries
7. Make sure to **Publish** each entry

### Client Instructions

To add/edit/remove job positions:
1. Login to Strapi admin
2. Go to Content Manager > Cariere Positions
3. Click "Create new entry" to add a position
4. Fill in the title and description
5. Click "Save" then "Publish"
6. Changes will appear immediately on the website
