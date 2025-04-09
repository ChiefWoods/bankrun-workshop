pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("Fm6KJkjxqrNii925STf4852ZvsZMim9D1foRYzbtTwXA");

#[program]
pub mod escrow {
    use super::*;

    pub fn make(
        ctx: Context<Make>,
        seed: u64,
        deposit_amount: u64,
        receive_amount: u64,
    ) -> Result<()> {
        Make::make(ctx, seed, deposit_amount, receive_amount)
    }

    pub fn take(ctx: Context<Take>) -> Result<()> {
        Take::take(ctx)
    }

    pub fn cancel(ctx: Context<Cancel>) -> Result<()> {
        Cancel::cancel(ctx)
    }
}
