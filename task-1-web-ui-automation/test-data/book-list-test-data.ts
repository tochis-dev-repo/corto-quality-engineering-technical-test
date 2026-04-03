interface Book {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
}

export const validDataSet: Book[] = [
    {
        "title": "Git Pocket Guide",
        "author": "Richard E. Silverman",
        "isbn": "9781449325862",
        "publisher": "O'Reilly Media"
    },
    {
        "title": "Learning JavaScript Design Patterns",
        "author": "Addy Osmani",
        "isbn": "9781449331818",
        "publisher": "O'Reilly Media"
    },
    {
        "title": "Eloquent JavaScript, Second Edition",
        "author": "Marijn Haverbeke",
        "isbn": "9781593275846",
        "publisher": "No Starch Press"
    }
];

export const invalidDataSet: Book[] = [
    {
        "title": "Oliver Twist",
        "author": "Charles Dickens",
        "isbn": "9780141439556",
        "publisher": "Penguin Classics"
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "isbn": "9780061120084",
        "publisher": "Harper Perennial Modern Classics"
    },
    {
        "title": "No Longer At Ease",
        "author": "Chinua Achebe",
        "isbn": "9780307269952",
        "publisher": "Anchor Books"
    }
];