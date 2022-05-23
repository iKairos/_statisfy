from sklearn.metrics import mean_absolute_percentage_error, accuracy_score
import numpy as np
import pandas as pd
import pickle

class LinearRegression:
    """
    Linear Regression is a machine learning algorithm that predicts continuous values based on given parameters.
    """
    def __init__(self):
        """
        Initializes different class-wide variables.
        """
        self.X = np.array([])
        self.y = np.array([])
        self.thetas = np.zeros([])
        self.theta_history = []
        self.cost_history = []
        self.gradient_history = []
        self.norm_max = 0
    
    def fit_data(self, X, y):
        """
        Fits the dataset into the model.
        """
        self.X = np.matrix(X)
        self.y = np.matrix(y).reshape([np.size(y),1])
        self.thetas = np.matrix(np.zeros([len(X.columns),1]))
        self.normalize_features()
    
    def normalize_features(self):
        """
        Normalizes features for ease of training.
        """
        self.norm_max = np.max(self.X)
        self.X = self.X / (self.norm_max)
    
    def cost_function(self):
        """
        Calculates the loss or errors in the model.
        """
        m = np.size(self.y)

        j = (1/2*m) * ((self.X @ self.thetas) - self.y).T @ ((self.X @ self.thetas) - self.y)

        return j
    
    def gradient_descent(self, iterations: int = 1000, learning_rate = 0.05):
        """
        Learning algorithm that calculates the slope of the cost function and subtracts it into the current parameters.
        """
        m = np.size(self.y)

        self.cost_history = np.zeros([iterations, 1])

        for _ in range(0,iterations):
            gradient = (1/m) * (self.X.T @ ((self.X @ self.thetas) - self.y))

            self.cost_history[_] = self.cost_function()
            self.gradient_history.append(gradient)
            self.theta_history.append(self.thetas)

            self.thetas = self.thetas - (learning_rate * gradient)
    
    def predict(self, X, sample_thetas = None):
        """
        Predictor based on the X values.
        """
        if sample_thetas is None:
            return (X/self.norm_max) @ self.thetas
        else:
            return (X/self.norm_max) @ sample_thetas
    
    def mape(self, y_true, y_pred):
        """
        Mean absolute percent error that calculates the average error in the model.
        
        y_true, y_pred = np.array(y_true), np.array(y_pred)
        return np.mean(np.abs((y_true - y_pred) / y_true))
        """

        return mean_absolute_percentage_error(y_true, y_pred) * 100
    
    def r_squared(self, y_true, y_pred):
        """
        Calculates the r-squared value accuracy of the linear regression model.
        """
        corr = np.corrcoef(y_true.tolist(), y_pred[0].tolist())
        return corr[0,1] ** 2
    
    def pickelize(self):
        return pickle.dumps(self)

class LogisticRegression(object):
    def __init__(self, X: pd.DataFrame, y: pd.DataFrame, debug = False):
        self.X = np.matrix(X)
        self.y = np.matrix(y).reshape(X.shape[0],1)

        self.parameters =  np.zeros((X.shape[1], 1))
        self.parameters_history = []
        
        self._cost_history = []
        
        self.debug = debug
    
    @property
    def cost_history(self):
        return self._cost_history
    
    def predict(self, features: pd.DataFrame):
        predicted = 1 / (1 + np.exp(-(features * self.parameters)))

        return predicted
    
    def cost_function(self):
        m = self.X.shape[0]
        prediction = self.predict(self.X)

        return 1/m * ((-self.y.T * np.log(prediction) - ((1 - self.y).T) * np.log(1 - prediction)))[0,0]
    
    def cost_gradient(self):
        m = self.X.shape[0]

        return 1/m * np.dot(self.X.T, (self.predict(self.X) - self.y))

    def train_model(self, iterations = 1000, learning_step = 0.05):
        self.parameters_history = self._cost_history = np.zeros((iterations,))

        for i in range(iterations):
            self.parameters = self.parameters - (learning_step * self.cost_gradient())
            self._cost_history[i] = self.cost_function()
            self.parameters_history[i] = self.parameters[0,0]
    
    def pickelize(self):
        return pickle.dumps(self)

    def accuracy(self, y_true, predicted):
        return accuracy_score(y_true, predicted)