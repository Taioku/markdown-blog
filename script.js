// Global theme manager instance
let globalThemeManager = null;

class ThemeManager {
    constructor() {
        if (globalThemeManager) {
            return globalThemeManager;
        }
        
        this.storageKey = 'markdown-reader-theme';
        this.setupThemeToggle();
        
        globalThemeManager = this;
        this.init();
    }

    setupThemeToggle() {
        this.updateThemeToggleElements();
    }

    updateThemeToggleElements() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
    }

    init() {
        // Set dark mode as default, load from localStorage if available
        const savedTheme = localStorage.getItem(this.storageKey) || 'dark';
        this.setTheme(savedTheme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Remove existing listeners to avoid duplicates
        document.removeEventListener('click', this.handleThemeToggleClick);
        document.addEventListener('click', this.handleThemeToggleClick.bind(this));
    }

    handleThemeToggleClick(event) {
        if (event.target.closest('#theme-toggle')) {
            event.preventDefault();
            this.toggleTheme();
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.storageKey, theme);
        this.updateThemeIcon(theme);
    }

    updateThemeIcon(theme) {
        // Update all theme icons on the page
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }
}

class MarkdownReader {
    constructor() {
        this.fileListElement = document.getElementById('file-list');
        this.contentElement = document.getElementById('content');
        this.tocElement = document.getElementById('toc');
        this.markdownFiles = [];
        
        // Default header content
        this.defaultHeader = {
            title: 'Markdown File Reader',
            subtitle: 'Click on any file to view its content'
        };
        
        this.init();
    }

    async init() {
        await this.loadMarkdownFiles();
        this.renderFileList();
    }

    async loadMarkdownFiles() {
        try {
            const manifest = await this.tryLoadManifest();
            this.markdownFiles = manifest?.files || [];
            
            if (this.markdownFiles.length === 0) {
                throw new Error('No markdown files found');
            }
        } catch (error) {
            console.error('Error loading markdown files:', error);
            this.showError('Failed to load markdown files. Make sure to create a src/manifest.json file listing your .md files.');
        }
    }

    async tryLoadManifest() {
        try {
            const response = await fetch('src/manifest.json');
            return response.ok ? await response.json() : null;
        } catch {
            return null;
        }
    }

    renderFileList() {
        if (this.markdownFiles.length === 0) {
            this.setHeader(this.defaultHeader);
            this.showNoFilesMessage();
            return;
        }

        const fileListHTML = this.markdownFiles
            .map(filename => `
                <a href="#" class="file-item" data-file="${filename}">
                    📄 ${filename}
                </a>
            `).join('');

        this.fileListElement.innerHTML = fileListHTML;
        this.addFileClickListeners();
    }

    showNoFilesMessage() {
        this.fileListElement.innerHTML = `
            <div class="error">
                <h3>No Markdown Files Found</h3>
                <p>To use this application:</p>
                <ol style="text-align: left; max-width: 500px; margin: 1rem auto;">
                    <li>Place your .md files in the <code>src/</code> folder</li>
                    <li>Create a <code>src/manifest.json</code> file listing your files</li>
                </ol>
                <p style="margin-top: 1rem;"><small>Example manifest.json:</small></p>
                <pre style="text-align: left; font-size: 0.9rem; margin-top: 0.5rem;">
{
  "files": [
    "README.md",
    "documentation.md",
    "tutorial.md"
  ]
}</pre>
            </div>
        `;
    }

    addFileClickListeners() {
        this.fileListElement.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const filename = item.dataset.file;
                this.loadAndRenderMarkdown(filename);
                this.setActiveFileItem(item);
            });
        });
    }

    setActiveFileItem(activeItem) {
        this.fileListElement.querySelectorAll('.file-item').forEach(item => 
            item.classList.remove('active')
        );
        activeItem.classList.add('active');
    }

    async loadAndRenderMarkdown(filename) {
        try {
            this.clearContent();
            this.setHeader({ title: filename.replace(/\.md$/i, '') });
            this.showLoadingMessage();
            
            const response = await fetch(`src/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            
            const markdownContent = await response.text();
            const htmlContent = marked.parse(markdownContent);
            
            this.hideLoadingMessage();
            this.renderMarkdownContent(htmlContent);
            this.generateTableOfContents();
            
        } catch (error) {
            console.error('Error loading markdown file:', error);
            this.showError(`Failed to load ${filename}. Make sure the file exists in the src folder.`);
            this.clearTableOfContents();
        }
    }

    clearContent() {
        this.contentElement.innerHTML = '';
    }

    showLoadingMessage() {
        const loadingDiv = this.createElement('div', 'loading', 'Loading markdown file...');
        this.contentElement.appendChild(loadingDiv);
    }

    hideLoadingMessage() {
        const loadingDiv = this.contentElement.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    renderMarkdownContent(htmlContent) {
        const contentDiv = this.createElement('div', 'markdown-content');
        contentDiv.innerHTML = htmlContent;
        this.contentElement.appendChild(contentDiv);
    }

    createElement(tag, className, textContent = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    generateTableOfContents() {
        const headers = this.contentElement.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6');
        
        if (headers.length === 0) {
            this.clearTableOfContents();
            return;
        }

        const tocItems = this.createTocItems(headers);
        const tocHTML = this.generateTocHTML(tocItems);
        
        this.tocElement.innerHTML = tocHTML;
        this.addTocClickListeners();
    }

    createTocItems(headers) {
        return Array.from(headers).map((header, index) => {
            const level = parseInt(header.tagName[1]);
            const text = header.textContent.trim();
            const id = this.generateHeaderId(text, index);
            
            header.id = id;
            
            return { level, text, id };
        });
    }

    generateHeaderId(text, index) {
        return `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    }

    generateTocHTML(tocItems) {
        return tocItems.map(item => `
            <a href="#${item.id}" class="toc-item toc-h${item.level}" data-id="${item.id}">
                ${item.text}
            </a>
        `).join('');
    }

    addTocClickListeners() {
        this.tocElement.querySelectorAll('.toc-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToHeader(item);
                this.setActiveTocItem(item);
            });
        });
    }

    scrollToHeader(tocItem) {
        const targetId = tocItem.getAttribute('data-id');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setActiveTocItem(activeItem) {
        this.tocElement.querySelectorAll('.toc-item').forEach(item => 
            item.classList.remove('active')
        );
        activeItem.classList.add('active');
    }

    clearTableOfContents() {
        this.tocElement.innerHTML = '<p class="no-content">No headings found</p>';
    }

    showError(message) {
        this.clearContent();
        this.setHeader(this.defaultHeader);
        
        const errorDiv = this.createElement('div', 'error');
        errorDiv.innerHTML = `
            <h3>Error</h3>
            <p>${message}</p>
        `;
        this.contentElement.appendChild(errorDiv);
        this.clearTableOfContents();
    }

    setHeader({ title, subtitle }) {
        const headerElement = this.contentElement.querySelector('.content-header') || 
                             this.createHeaderElement();
        
        headerElement.innerHTML = `
            <h1>${title}</h1>
            ${subtitle ? `<p>${subtitle}</p>` : ''}
        `;
        
        if (!this.contentElement.contains(headerElement)) {
            this.contentElement.appendChild(headerElement);
        }
    }

    createHeaderElement() {
        return this.createElement('div', 'content-header');
    }
}

// Initialize the markdown reader and theme manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MarkdownReader();
});
