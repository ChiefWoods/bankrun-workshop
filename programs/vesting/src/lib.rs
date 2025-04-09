pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("A8CCJxHV1hZLMUSG6Hx8QbLwjSgiefNWVu5gYc74Nn7E");

#[program]
pub mod vesting {
    use super::*;

    pub fn create_vest(ctx: Context<CreateVest>, company_name: String) -> Result<()> {
        CreateVest::create_vest(ctx, company_name)
    }

    pub fn create_employee(ctx: Context<CreateEmployee>, args: CreateEmployeeArgs) -> Result<()> {
        CreateEmployee::create_employee(ctx, args)
    }

    pub fn claim_tokens(ctx: Context<ClaimTokens>) -> Result<()> {
        ClaimTokens::claim_tokens(ctx)
    }
}
