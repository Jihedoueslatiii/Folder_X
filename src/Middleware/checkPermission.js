app.use(bodyParser.json());
app.use('/api/auth', authRoute);
app.use('/api/documents', documentRoutes);

const checkPermission = (action, level) => {
    return (req, res, next) => {
        const user = req.user; // Assume user is set by previous middleware (e.g., JWT auth)
        const hasPermission = user.permissions.some(permission => permission.action === action && permission.level === level);
        if (!hasPermission) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action' });
        }
        next();
    };
};
const checkPermission = require('../Middleware/checkPermission');

router.post('/document-bases', checkPermission('create', 'base'), async (req, res) => {
    // Create document base logic
});

router.post('/folders', checkPermission('create', 'folder'), async (req, res) => {
    // Create folder logic
});

router.post('/documents', checkPermission('create', 'document'), async (req, res) => {
    // Create document logic
});


module.exports = checkPermission;
