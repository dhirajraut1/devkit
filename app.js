// Navigation Handler
const navigation = {
    init() {
        const navItems = document.querySelectorAll('.nav-item');
        const toolContainers = document.querySelectorAll('.tool-container');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const toolId = item.dataset.tool;
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Show corresponding tool
                toolContainers.forEach(container => {
                    container.classList.remove('active');
                });
                document.getElementById(toolId).classList.add('active');
            });
        });
    }
};

// Character Counter Tool
const characterCounter = {
    init() {
        const input = document.getElementById('char-input');
        const charCount = document.getElementById('char-count');
        const wordCount = document.getElementById('word-count');
        const lineCount = document.getElementById('line-count');
        const paraCount = document.getElementById('para-count');

        input.addEventListener('input', () => {
            const text = input.value;
            
            // Character count
            charCount.textContent = text.length;
            
            // Word count
            const words = text.trim().split(/\s+/).filter(word => word.length > 0);
            wordCount.textContent = words.length;
            
            // Line count
            const lines = text.split('\n');
            lineCount.textContent = lines.length;
            
            // Paragraph count
            const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
            paraCount.textContent = paragraphs.length;
        });
    }
};

// Diff Checker Tool
const diffChecker = {
    compare() {
        const original = document.getElementById('diff-original').value;
        const modified = document.getElementById('diff-modified').value;
        const resultDiv = document.getElementById('diff-result');
        
        if (!original && !modified) {
            resultDiv.innerHTML = '<p style="color: var(--text-tertiary);">Enter text in both fields to compare.</p>';
            return;
        }
        
        const diff = this.computeDiff(original, modified);
        resultDiv.innerHTML = diff;
    },
    
    computeDiff(original, modified) {
        const originalLines = original.split('\n');
        const modifiedLines = modified.split('\n');
        let result = '';
        
        const maxLines = Math.max(originalLines.length, modifiedLines.length);
        
        for (let i = 0; i < maxLines; i++) {
            const origLine = originalLines[i] || '';
            const modLine = modifiedLines[i] || '';
            
            if (origLine === modLine) {
                result += `<div>${this.escapeHtml(origLine) || '&nbsp;'}</div>`;
            } else {
                if (origLine) {
                    result += `<div><span class="diff-removed">- ${this.escapeHtml(origLine)}</span></div>`;
                }
                if (modLine) {
                    result += `<div><span class="diff-added">+ ${this.escapeHtml(modLine)}</span></div>`;
                }
            }
        }
        
        return result || '<p style="color: var(--text-tertiary);">No differences found.</p>';
    },
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    clear() {
        document.getElementById('diff-original').value = '';
        document.getElementById('diff-modified').value = '';
        document.getElementById('diff-result').innerHTML = '';
    }
};

// Case Converter Tool
const caseConverter = {
    convert(type) {
        const input = document.getElementById('case-input');
        let text = input.value;
        
        if (!text) return;
        
        switch(type) {
            case 'upper':
                text = text.toUpperCase();
                break;
            case 'lower':
                text = text.toLowerCase();
                break;
            case 'title':
                text = text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
                break;
            case 'sentence':
                text = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
                break;
            case 'camel':
                text = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
                break;
            case 'pascal':
                text = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
                    .replace(/^./, char => char.toUpperCase());
                break;
            case 'snake':
                text = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '_')
                    .replace(/^_+|_+$/g, '');
                break;
            case 'kebab':
                text = text.toLowerCase()
                    .replace(/[^a-zA-Z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                break;
        }
        
        input.value = text;
    }
};

// JSON Formatter Tool
const jsonFormatter = {
    format() {
        const input = document.getElementById('json-input').value;
        const output = document.getElementById('json-output');
        const status = document.getElementById('json-status');
        
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            output.textContent = formatted;
            this.showStatus('Valid JSON formatted successfully!', 'success');
        } catch (error) {
            this.showStatus(`Error: ${error.message}`, 'error');
        }
    },
    
    minify() {
        const input = document.getElementById('json-input').value;
        const output = document.getElementById('json-output');
        const status = document.getElementById('json-status');
        
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            output.textContent = minified;
            this.showStatus('JSON minified successfully!', 'success');
        } catch (error) {
            this.showStatus(`Error: ${error.message}`, 'error');
        }
    },
    
    validate() {
        const input = document.getElementById('json-input').value;
        const status = document.getElementById('json-status');
        
        try {
            JSON.parse(input);
            this.showStatus('✓ Valid JSON', 'success');
        } catch (error) {
            this.showStatus(`✗ Invalid JSON: ${error.message}`, 'error');
        }
    },
    
    clear() {
        document.getElementById('json-input').value = '';
        document.getElementById('json-output').textContent = '';
        document.getElementById('json-status').innerHTML = '';
    },
    
    copy() {
        const output = document.getElementById('json-output').textContent;
        navigator.clipboard.writeText(output).then(() => {
            this.showStatus('Copied to clipboard!', 'success');
        });
    },
    
    showStatus(message, type) {
        const status = document.getElementById('json-status');
        status.textContent = message;
        status.className = `status-message ${type}`;
        setTimeout(() => {
            status.innerHTML = '';
        }, 3000);
    }
};

// Markdown Preview Tool
const markdownPreview = {
    init() {
        const input = document.getElementById('markdown-input');
        const output = document.getElementById('markdown-output');
        
        input.addEventListener('input', () => {
            const markdown = input.value;
            const html = marked.parse(markdown);
            output.innerHTML = html;
        });
        
        // Initial render
        output.innerHTML = marked.parse(input.value);
    }
};

// Base64 Encoder Tool
const base64Tool = {
    encode() {
        const input = document.getElementById('base64-input').value;
        const output = document.getElementById('base64-output');
        
        try {
            const encoded = btoa(unescape(encodeURIComponent(input)));
            output.value = encoded;
        } catch (error) {
            output.value = 'Error encoding: ' + error.message;
        }
    },
    
    decode() {
        const input = document.getElementById('base64-input').value;
        const output = document.getElementById('base64-output');
        
        try {
            const decoded = decodeURIComponent(escape(atob(input)));
            output.value = decoded;
        } catch (error) {
            output.value = 'Error decoding: ' + error.message;
        }
    },
    
    clear() {
        document.getElementById('base64-input').value = '';
        document.getElementById('base64-output').value = '';
    }
};

// Color Picker Tool
const colorPicker = {
    init() {
        const colorInput = document.getElementById('color-input');
        const hexInput = document.getElementById('hex-input');
        const display = document.getElementById('color-display');
        
        const updateColor = (hex) => {
            display.style.backgroundColor = hex;
            this.updateFormats(hex);
        };
        
        colorInput.addEventListener('input', (e) => {
            const hex = e.target.value;
            hexInput.value = hex;
            updateColor(hex);
        });
        
        hexInput.addEventListener('input', (e) => {
            let hex = e.target.value;
            if (!hex.startsWith('#')) hex = '#' + hex;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                colorInput.value = hex;
                updateColor(hex);
            }
        });
        
        // Initial update
        updateColor(colorInput.value);
    },
    
    updateFormats(hex) {
        const rgb = this.hexToRgb(hex);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        const cmyk = this.rgbToCmyk(rgb.r, rgb.g, rgb.b);
        
        document.getElementById('rgb-output').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.getElementById('hsl-output').value = `hsl(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById('cmyk-output').value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    },
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    },
    
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    },
    
    rgbToCmyk(r, g, b) {
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);
        let k = Math.min(c, m, y);
        
        c = k === 1 ? 0 : Math.round(((c - k) / (1 - k)) * 100);
        m = k === 1 ? 0 : Math.round(((m - k) / (1 - k)) * 100);
        y = k === 1 ? 0 : Math.round(((y - k) / (1 - k)) * 100);
        k = Math.round(k * 100);
        
        return { c, m, y, k };
    }
};

// UUID Generator Tool
const uuidGenerator = {
    generate() {
        const uuid = this.generateUUID();
        document.getElementById('uuid-value').textContent = uuid;
    },
    
    generateMultiple() {
        const listDiv = document.getElementById('uuid-list');
        listDiv.innerHTML = '';
        
        for (let i = 0; i < 10; i++) {
            const uuid = this.generateUUID();
            const item = document.createElement('div');
            item.className = 'uuid-item';
            item.innerHTML = `
                ${uuid}
                <button class="btn-icon" onclick="tools.uuid.copySpecific('${uuid}')" title="Copy">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                </button>
            `;
            listDiv.appendChild(item);
        }
    },
    
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    
    copy() {
        const uuid = document.getElementById('uuid-value').textContent;
        if (uuid !== 'Click generate to create a UUID') {
            navigator.clipboard.writeText(uuid);
        }
    },
    
    copySpecific(uuid) {
        navigator.clipboard.writeText(uuid);
    }
};

// Timestamp Converter Tool
const timestampConverter = {
    init() {
        this.updateCurrentTime();
        setInterval(() => this.updateCurrentTime(), 1000);
    },
    
    updateCurrentTime() {
        const now = Math.floor(Date.now() / 1000);
        const date = new Date();
        
        document.getElementById('current-timestamp').textContent = now;
        document.getElementById('current-date').textContent = date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },
    
    convertTimestamp() {
        const timestamp = parseInt(document.getElementById('timestamp-input').value);
        const resultDiv = document.getElementById('timestamp-result');
        
        if (isNaN(timestamp)) {
            resultDiv.innerHTML = '<p style="color: var(--error);">Please enter a valid timestamp</p>';
            return;
        }
        
        const date = new Date(timestamp * 1000);
        
        resultDiv.innerHTML = `
            <div style="margin-bottom: 12px;"><strong>Local Time:</strong> ${date.toLocaleString()}</div>
            <div style="margin-bottom: 12px;"><strong>UTC:</strong> ${date.toUTCString()}</div>
            <div style="margin-bottom: 12px;"><strong>ISO 8601:</strong> ${date.toISOString()}</div>
            <div><strong>Relative:</strong> ${this.getRelativeTime(date)}</div>
        `;
    },
    
    convertDate() {
        const dateInput = document.getElementById('datetime-input').value;
        const resultDiv = document.getElementById('timestamp-result');
        
        if (!dateInput) {
            resultDiv.innerHTML = '<p style="color: var(--error);">Please select a date and time</p>';
            return;
        }
        
        const date = new Date(dateInput);
        const timestamp = Math.floor(date.getTime() / 1000);
        
        resultDiv.innerHTML = `
            <div style="margin-bottom: 12px;"><strong>Unix Timestamp:</strong> ${timestamp}</div>
            <div style="margin-bottom: 12px;"><strong>Milliseconds:</strong> ${date.getTime()}</div>
            <div style="margin-bottom: 12px;"><strong>ISO 8601:</strong> ${date.toISOString()}</div>
            <div><strong>UTC:</strong> ${date.toUTCString()}</div>
        `;
    },
    
    getRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
};

// Bcrypt Hasher Tool
const bcryptHasher = {
    async hash() {
        const password = document.getElementById('bcrypt-password').value;
        const rounds = parseInt(document.getElementById('bcrypt-rounds').value);
        const hashOutput = document.getElementById('bcrypt-hash');
        
        if (!password) {
            this.showMessage('Please enter a password', 'error');
            return;
        }
        
        if (rounds < 4 || rounds > 12) {
            this.showMessage('Rounds must be between 4 and 12', 'error');
            return;
        }
        
        try {
            // Show loading state
            hashOutput.value = 'Generating hash...';
            
            // Generate salt and hash using dcodeIO.bcrypt
            const salt = dcodeIO.bcrypt.genSaltSync(rounds);
            const hash = dcodeIO.bcrypt.hashSync(password, salt);
            
            hashOutput.value = hash;
            this.showMessage(`Hash generated successfully with ${rounds} rounds`, 'success');
        } catch (error) {
            hashOutput.value = '';
            this.showMessage('Error generating hash: ' + error.message, 'error');
        }
    },
    
    async verify() {
        const password = document.getElementById('verify-password').value;
        const hash = document.getElementById('verify-hash').value;
        const resultDiv = document.getElementById('verify-result');
        
        if (!password || !hash) {
            resultDiv.innerHTML = '';
            this.showMessage('Please enter both password and hash', 'error');
            return;
        }
        
        try {
            resultDiv.innerHTML = 'Verifying...';
            resultDiv.className = 'verify-result';
            
            const isMatch = dcodeIO.bcrypt.compareSync(password, hash);
            
            if (isMatch) {
                resultDiv.innerHTML = '✓ Password matches hash';
                resultDiv.className = 'verify-result success';
            } else {
                resultDiv.innerHTML = '✗ Password does not match hash';
                resultDiv.className = 'verify-result failed';
            }
        } catch (error) {
            resultDiv.innerHTML = '✗ Invalid hash format';
            resultDiv.className = 'verify-result failed';
        }
    },
    
    copyHash() {
        const hash = document.getElementById('bcrypt-hash').value;
        if (hash && hash !== 'Generating hash...') {
            navigator.clipboard.writeText(hash).then(() => {
                this.showMessage('Hash copied to clipboard!', 'success');
            });
        }
    },
    
    showMessage(message, type) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = `status-message ${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        notification.style.minWidth = '300px';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Lorem Ipsum Generator Tool
const loremIpsumGenerator = {
    loremWords: [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'semper', 'quis', 'lectus',
        'nulla', 'at', 'volutpat', 'diam', 'maecenas', 'ultricies', 'mi', 'eget',
        'mauris', 'pharetra', 'magna', 'ac', 'placerat', 'vestibulum', 'lectus',
        'mauris', 'ultrices', 'eros', 'integer', 'vitae', 'justo', 'eget', 'arcu',
        'dictum', 'varius', 'duis', 'convallis', 'tellus', 'elementum', 'sagittis'
    ],
    
    generate() {
        const type = document.getElementById('lorem-type').value;
        const count = parseInt(document.getElementById('lorem-count').value);
        const startWithLorem = document.getElementById('lorem-start-with').checked;
        const output = document.getElementById('lorem-output');
        
        let result = '';
        
        switch(type) {
            case 'paragraphs':
                result = this.generateParagraphs(count, startWithLorem);
                break;
            case 'sentences':
                result = this.generateSentences(count, startWithLorem);
                break;
            case 'words':
                result = this.generateWords(count, startWithLorem);
                break;
        }
        
        output.value = result;
    },
    
    generateWords(count, startWithLorem) {
        let words = [];
        
        if (startWithLorem) {
            words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
            count -= 5;
        }
        
        for (let i = 0; i < count; i++) {
            words.push(this.getRandomWord());
        }
        
        return words.join(' ') + '.';
    },
    
    generateSentences(count, startWithLorem) {
        let sentences = [];
        
        if (startWithLorem) {
            sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
            count -= 1;
        }
        
        for (let i = 0; i < count; i++) {
            const wordCount = Math.floor(Math.random() * 10) + 5;
            let sentence = [];
            
            for (let j = 0; j < wordCount; j++) {
                sentence.push(this.getRandomWord());
            }
            
            sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
            sentences.push(sentence.join(' ') + '.');
        }
        
        return sentences.join(' ');
    },
    
    generateParagraphs(count, startWithLorem) {
        let paragraphs = [];
        
        if (startWithLorem) {
            paragraphs.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
            count -= 1;
        }
        
        for (let i = 0; i < count; i++) {
            const sentenceCount = Math.floor(Math.random() * 4) + 3;
            let paragraph = [];
            
            for (let j = 0; j < sentenceCount; j++) {
                const wordCount = Math.floor(Math.random() * 12) + 6;
                let sentence = [];
                
                for (let k = 0; k < wordCount; k++) {
                    sentence.push(this.getRandomWord());
                }
                
                sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
                paragraph.push(sentence.join(' ') + '.');
            }
            
            paragraphs.push(paragraph.join(' '));
        }
        
        return paragraphs.join('\n\n');
    },
    
    getRandomWord() {
        return this.loremWords[Math.floor(Math.random() * this.loremWords.length)];
    },
    
    copy() {
        const output = document.getElementById('lorem-output').value;
        if (output) {
            navigator.clipboard.writeText(output).then(() => {
                this.showMessage('Copied to clipboard!', 'success');
            });
        }
    },
    
    clear() {
        document.getElementById('lorem-output').value = '';
    },
    
    showMessage(message, type) {
        const notification = document.createElement('div');
        notification.className = `status-message ${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        notification.style.minWidth = '300px';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// QR Code Generator Tool
const qrGenerator = {
    currentQR: null,
    
    generate() {
        const input = document.getElementById('qr-input').value;
        const size = parseInt(document.getElementById('qr-size').value);
        const errorLevel = document.getElementById('qr-error').value;
        const container = document.getElementById('qr-canvas-container');
        
        if (!input.trim()) {
            this.showMessage('Please enter content to generate QR code', 'error');
            return;
        }
        
        // Clear previous QR code
        container.innerHTML = '';
        
        try {
            // Create QR code
            this.currentQR = new QRCode(container, {
                text: input,
                width: size,
                height: size,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel[errorLevel]
            });
            
            this.showMessage('QR code generated successfully!', 'success');
        } catch (error) {
            this.showMessage('Error generating QR code: ' + error.message, 'error');
        }
    },
    
    download() {
        const container = document.getElementById('qr-canvas-container');
        const canvas = container.querySelector('canvas');
        
        if (!canvas) {
            this.showMessage('Please generate a QR code first', 'error');
            return;
        }
        
        try {
            // Convert canvas to blob and download
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'qrcode.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                this.showMessage('QR code downloaded!', 'success');
            });
        } catch (error) {
            this.showMessage('Error downloading QR code: ' + error.message, 'error');
        }
    },
    
    clear() {
        document.getElementById('qr-input').value = '';
        document.getElementById('qr-canvas-container').innerHTML = '';
        this.currentQR = null;
    },
    
    showMessage(message, type) {
        const notification = document.createElement('div');
        notification.className = `status-message ${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        notification.style.minWidth = '300px';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Global tools object for onclick handlers
const tools = {
    diff: diffChecker,
    caseConverter: caseConverter,
    json: jsonFormatter,
    base64: base64Tool,
    uuid: uuidGenerator,
    timestamp: timestampConverter,
    bcrypt: bcryptHasher,
    lorem: loremIpsumGenerator,
    qr: qrGenerator
};

// Initialize all tools
document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
    characterCounter.init();
    markdownPreview.init();
    colorPicker.init();
    timestampConverter.init();
    
    console.log('%c🚀 DevKit Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
});