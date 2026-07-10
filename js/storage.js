/**
 * ExamStorage - Quản lý lưu trữ kết quả thi trong localStorage
 */

const ExamStorage = {
    STORAGE_KEY: 'exam_results',
    
    /**
     * Lưu kết quả bài thi
     */
    saveResult(result) {
        try {
            const results = this.getAllResults();
            
            // Tạo ID và timestamp
            result.id = Date.now();
            result.timestamp = new Date().toISOString();
            
            // Thêm vào đầu mảng
            results.unshift(result);
            
            // Giới hạn 50 bài gần nhất
            if (results.length > 50) {
                results.pop();
            }
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(results));
            return true;
        } catch (error) {
            console.error('Lỗi lưu dữ liệu:', error);
            return false;
        }
    },
    
    /**
     * Lấy tất cả kết quả
     */
    getAllResults() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Lỗi đọc dữ liệu:', error);
            return [];
        }
    },
    
    /**
     * Lấy thống kê tổng quan
     */
    getStatistics() {
        const results = this.getAllResults();
        
        if (results.length === 0) {
            return {
                totalTests: 0,
                averageScore: 0,
                highestScore: 0,
                totalCorrect: 0
            };
        }
        
        const scores = results.map(r => parseFloat(r.score));
        const correct = results.map(r => r.correctAnswers || 0);
        
        return {
            totalTests: results.length,
            averageScore: (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2),
            highestScore: Math.max(...scores).toFixed(2),
            totalCorrect: correct.reduce((a, b) => a + b, 0)
        };
    },
    
    /**
     * Lấy dữ liệu cho biểu đồ
     */
    getScoreHistory(limit = 10) {
        const results = this.getAllResults().slice(0, limit).reverse();
        return results.map(r => ({
            date: new Date(r.timestamp).toLocaleDateString('vi-VN'),
            score: parseFloat(r.score),
            testName: r.testName
        }));
    },
    
    /**
     * Xóa toàn bộ dữ liệu
     */
    clearAll() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Lỗi xóa dữ liệu:', error);
            return false;
        }
    }
};