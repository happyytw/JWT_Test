//
//  AccountListViewModel.swift
//  TokenTest
//
//  Created by Taewon Yoon on 11/10/23.
//

import Foundation

class AccountListViewModel: ObservableObject {
    
    @Published var accounts: [AccountViewModel] = []
    
    func getAllAccounts() {
        
        let defaults = UserDefaults.standard
        guard let token = defaults.string(forKey: "token") else {
            return
        }
        
        Webservice().getAllAccounts(token: token) { (result) in
            switch result {
                case .success(let accounts):
                    DispatchQueue.main.async {
                        self.accounts = accounts.map(AccountViewModel.init)
                    }
                case .failure(let error):
                    print(error.localizedDescription)
            }
        }
        
    }
    
}



struct AccountViewModel {
    
    let account: Account
    
    let id = UUID()
    
    var name: String {
        return account.name
    }
    
    var balance: Double {
        return account.balance
    }
}
