//
//  View+Extensions.swift
//  TokenTest
//
//  Created by Taewon Yoon on 11/10/23.
//

import Foundation
import SwiftUI

extension View {
    
    func embedInNavigationView() -> some View {
        return NavigationView { self }
    }
    
}
